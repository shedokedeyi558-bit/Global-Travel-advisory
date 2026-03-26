// Vercel Serverless Function for AI API calls
// This provides better security by keeping the API key server-side

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input, context = {} } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  try {
    // Import Groq SDK server-side
    const Groq = require('groq-sdk');
    
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY, // Server-side environment variable
    });

    const ELITE_SYSTEM_PROMPT = `You are an elite AI travel assistant.

Rules:
- Always give precise, specific, and useful answers
- Never give generic or vague responses
- Avoid filler phrases like 'it depends' or 'varies'
- Think step-by-step before answering
- If the question is simple → give a sharp, direct answer
- If complex → break into structured sections
- Include real-world details (prices, locations, examples)

Travel-specific behavior:
- Suggest real places, food, and experiences
- Include safety tips when relevant
- Provide estimated costs when possible

Output style:
- Clean, readable, structured
- Use bullet points or sections when helpful
- No unnecessary explanations
- Do not sound robotic`;

    // Format user input
    const formattedInput = `Answer this clearly and intelligently:\n${input}`;

    // Detect response mode
    const lowerInput = input.toLowerCase();
    let modeInstructions = '';
    
    if (lowerInput.includes('trip') || lowerInput.includes('plan') || 
        lowerInput.includes('days') || lowerInput.includes('itinerary') ||
        /\d+\s*day/.test(lowerInput)) {
      modeInstructions = '\n\nIMPORTANT: Return response as valid JSON with this structure: {"days": [{"day": 1, "activities": [], "food": [], "notes": ""}], "budget_estimate": "", "tips": []}';
    } else if (lowerInput.includes('cheap') || lowerInput.includes('near') ||
               lowerInput.includes('hotels') || lowerInput.includes('restaurants')) {
      modeInstructions = '\n\nIMPORTANT: Return response as valid JSON with this structure: {"type": "", "price": "", "location": "", "amenities": []}';
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: ELITE_SYSTEM_PROMPT
        },
        {
          role: "user",
          content: formattedInput + modeInstructions
        }
      ],
      max_tokens: 500,
      temperature: 0.2,
      top_p: 0.8,
    });

    const aiResponse = completion.choices?.[0]?.message?.content?.trim();

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Try to parse JSON if it looks like JSON
    let finalResponse = aiResponse;
    if (modeInstructions && (aiResponse.includes('{') && aiResponse.includes('}'))) {
      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          finalResponse = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        // Keep as text if JSON parsing fails
      }
    }

    res.status(200).json({ 
      success: true, 
      response: finalResponse,
      model: "llama-3.3-70b-versatile"
    });

  } catch (error) {
    console.error('AI API Error:', error);
    
    // Return intelligent fallback
    let fallbackResponse = "I can provide specific travel advice! For the best help, tell me your destination, travel dates, budget range, and specific questions.";
    
    if (input.toLowerCase().includes('cost') && input.toLowerCase().includes('china')) {
      fallbackResponse = `**England to China Travel Costs:**

**Flights:** £450-1,200 return
• Budget: £450-650 (with stops)
• Direct: £700-900 (British Airways, Virgin)

**Daily Costs in China:**
• Budget: £25-40/day (hostels, local food)
• Mid-range: £50-80/day (3-star hotels)
• Luxury: £120+/day (5-star hotels)

**Visa:** £151 (10-year multiple entry)
**Total 7-day trip:** £800-1,500 per person`;
    }

    res.status(200).json({ 
      success: true, 
      response: fallbackResponse,
      fallback: true,
      error: error.message
    });
  }
}