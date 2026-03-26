import { motion } from 'framer-motion';
import { getHealthData } from '../utils/healthData';
import { Lightbulb } from 'lucide-react';

export default function HealthAIInsights({ selectedCountry }) {
  const data = getHealthData(selectedCountry);

  if (!data) return null;

  const generateInsights = () => {
    const insights = [];

    // Water safety insight
    if (data.waterSafety < 70) {
      insights.push('⚠️ Drink bottled or boiled water only. Avoid ice in drinks.');
    } else {
      insights.push('✓ Tap water is generally safe, but bottled water is recommended for visitors.');
    }

    // Air quality insight
    if (data.airQuality < 60) {
      insights.push('⚠️ Air quality is poor. Consider wearing N95 masks during outdoor activities.');
    } else if (data.airQuality < 80) {
      insights.push('⚠️ Air quality is moderate. Sensitive individuals should limit outdoor exposure.');
    } else {
      insights.push('✓ Air quality is good. Enjoy outdoor activities freely.');
    }

    // Healthcare insight
    if (data.healthcareQuality > 85) {
      insights.push('✓ Excellent healthcare facilities available. Medical care is reliable.');
    } else if (data.healthcareQuality > 70) {
      insights.push('⚠️ Healthcare is adequate but may be limited outside major cities.');
    } else {
      insights.push('⚠️ Healthcare facilities are limited. Travel insurance is essential.');
    }

    // Heat risk insight
    if (data.heatRisk > 70) {
      insights.push('🌡️ Extreme heat risk. Stay hydrated, use sunscreen, and avoid midday sun.');
    } else if (data.heatRisk > 40) {
      insights.push('🌡️ Moderate heat. Drink plenty of water and take regular breaks.');
    }

    // Disease insight
    const highRiskDiseases = Object.entries(data.diseases)
      .filter(([_, risk]) => risk > 50)
      .map(([disease]) => disease);

    if (highRiskDiseases.length > 0) {
      insights.push(`💉 High risk for ${highRiskDiseases.join(', ')}. Ensure vaccinations are up to date.`);
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="rounded-2xl backdrop-blur-xl border border-white/10 p-6 bg-gradient-to-br from-slate-900/40 to-slate-950/40 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.4) 100%)',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb size={18} className="text-blue-400" />
        <p className="text-xs font-semibold text-blue-400/60 uppercase tracking-widest">AI HEALTH INSIGHTS</p>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
          >
            <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
            <p className="text-sm text-slate-300">{insight}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
