import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageCircle, MapPin, Shield, Lightbulb, Zap } from 'lucide-react';
import PremiumPageTemplate from '../components/PremiumPageTemplate';
import { generateAIResponse, checkAIService, debugEnvironment } from '../utils/aiService';

export default function AIFeatures() {
  const [aiStatus, setAiStatus] = useState(null);
  const [testResponse, setTestResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Travel Assistant',
      description: 'Get instant answers to your travel questions with our intelligent chatbot.',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: MapPin,
      title: 'Smart Destination Recommendations',
      description: 'Discover perfect destinations based on your preferences and travel style.',
      color: 'from-green-600 to-green-700'
    },
    {
      icon: Shield,
      title: 'Personalized Safety Insights',
      description: 'Get tailored safety advice and risk assessments for your specific situation.',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Lightbulb,
      title: 'Intelligent Trip Planning',
      description: 'Create optimized itineraries with AI-powered suggestions and local insights.',
      color: 'from-purple-600 to-purple-700'
    }
  ];

  const handleTestAI = async () => {
    setIsLoading(true);
    try {
      const result = await checkAIService();
      setAiStatus(result.status);
      setTestResponse(result.response || result.error);
    } catch (error) {
      setAiStatus('error');
      setTestResponse(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestMath = async () => {
    setIsLoading(true);
    try {
      const mathResponse = await generateAIResponse("What is 15 * 8? Show your calculation step by step.");
      setTestResponse(mathResponse);
      setAiStatus('math-test');
    } catch (error) {
      setTestResponse('Error testing math: ' + error.message);
      setAiStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestGeneral = async () => {
    setIsLoading(true);
    try {
      const generalResponse = await generateAIResponse("Explain what JavaScript is in simple terms with real examples.");
      setTestResponse(generalResponse);
      setAiStatus('general-test');
    } catch (error) {
      setTestResponse('Error testing general knowledge: ' + error.message);
      setAiStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestTravel = async () => {
    setIsLoading(true);
    try {
      const travelResponse = await generateAIResponse("What is the travel cost for China from England? Include flights, accommodation, food, and activities for a 7-day trip with specific prices.");
      setTestResponse(travelResponse);
      setAiStatus('travel-test');
    } catch (error) {
      setTestResponse('Error testing travel question: ' + error.message);
      setAiStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestItinerary = async () => {
    setIsLoading(true);
    try {
      const itineraryResponse = await generateAIResponse("Create a 3-day itinerary for Tokyo with cultural interests and moderate budget");
      setTestResponse(typeof itineraryResponse === 'object' ? JSON.stringify(itineraryResponse, null, 2) : itineraryResponse);
      setAiStatus('itinerary-test');
    } catch (error) {
      setTestResponse('Error testing itinerary: ' + error.message);
      setAiStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebugEnvironment = () => {
    const debugInfo = debugEnvironment();
    setTestResponse(`Environment Debug:\n${JSON.stringify(debugInfo, null, 2)}`);
    setAiStatus('debug');
  };

  return (
    <PremiumPageTemplate
      title="AI-Powered Travel Intelligence"
      subtitle="Experience the future of travel planning with our advanced AI assistant. Get personalized recommendations, safety insights, and intelligent trip planning."
      icon="smart_toy"
    >
      {/* AI Status Check */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900 rounded-xl p-6 mb-12 border border-yellow-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Zap className="text-primary" size={24} />
            AI Service Status
          </h3>
          <div className="flex flex-wrap gap-3">
            <motion.button
              onClick={handleTestAI}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Testing...' : 'Test Connection'}
            </motion.button>
            <motion.button
              onClick={handleTestTravel}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Test Travel Cost'}
            </motion.button>
            <motion.button
              onClick={handleTestMath}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Test Math'}
            </motion.button>
            <motion.button
              onClick={handleTestGeneral}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Test General'}
            </motion.button>
            <motion.button
              onClick={handleTestItinerary}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Test Itinerary'}
            </motion.button>
            <motion.button
              onClick={handleDebugEnvironment}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Debug Env
            </motion.button>
          </div>
        </div>

        {aiStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              aiStatus === 'online' 
                ? 'bg-green-900/20 border-green-700 text-green-400'
                : aiStatus === 'demo'
                ? 'bg-blue-900/20 border-blue-700 text-blue-400'
                : 'bg-red-900/20 border-red-700 text-red-400'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                aiStatus === 'online' ? 'bg-green-400' : 
                aiStatus === 'travel-test' ? 'bg-orange-400' :
                aiStatus === 'math-test' ? 'bg-green-400' :
                aiStatus === 'general-test' ? 'bg-purple-400' :
                aiStatus === 'itinerary-test' ? 'bg-indigo-400' :
                aiStatus === 'debug' ? 'bg-yellow-400' :
                aiStatus === 'model_error' ? 'bg-yellow-400' :
                aiStatus === 'demo' ? 'bg-blue-400' : 'bg-red-400'
              }`} />
              <span className="font-semibold">
                {aiStatus === 'online' ? 'AI Service Online' : 
                 aiStatus === 'travel-test' ? 'Travel Cost Test' :
                 aiStatus === 'math-test' ? 'Math Test Result' :
                 aiStatus === 'general-test' ? 'General Knowledge Test' :
                 aiStatus === 'itinerary-test' ? 'Itinerary JSON Test' :
                 aiStatus === 'debug' ? 'Environment Debug' :
                 aiStatus === 'model_error' ? 'Model Issue - Using Fallbacks' :
                 aiStatus === 'demo' ? 'Demo Response' : 'Service Issue'}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{testResponse}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: features.indexOf(feature) * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className={`bg-gradient-to-r ${feature.color} rounded-xl p-6 h-full`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-zinc-900 rounded-xl p-8 mb-12 border border-yellow-500/20"
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <Bot className="text-primary" size={28} />
          How Our AI Works
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h4 className="font-semibold text-white mb-2">Ask Questions</h4>
            <p className="text-slate-300 text-sm">
              Chat with our AI about destinations, safety, budgets, or travel plans
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h4 className="font-semibold text-white mb-2">AI Analysis</h4>
            <p className="text-slate-300 text-sm">
              Our AI analyzes your query with real-time data and safety information
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h4 className="font-semibold text-white mb-2">Get Insights</h4>
            <p className="text-slate-300 text-sm">
              Receive personalized recommendations and actionable travel advice
            </p>
          </div>
        </div>
      </motion.div>

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary/10 to-yellow-500/10 rounded-xl p-8 border border-primary/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4">💡 Tips for Better AI Interactions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-primary mb-2">Ask Specific Questions</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• "Is Lagos safe for solo female travelers?"</li>
              <li>• "What's the budget for 5 days in Tokyo?"</li>
              <li>• "Create a 3-day itinerary for Paris"</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-primary mb-2">Provide Context</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Mention your travel style and preferences</li>
              <li>• Include your budget range</li>
              <li>• Specify travel dates if relevant</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </PremiumPageTemplate>
  );
}