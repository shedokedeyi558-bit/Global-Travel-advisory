import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const features = [
  { icon: 'text_fields', title: 'Adjustable Text Size', description: 'Increase or decrease text size for better readability' },
  { icon: 'contrast', title: 'High Contrast Mode', description: 'Enhanced contrast for users with visual impairments' },
  { icon: 'hearing', title: 'Captions & Transcripts', description: 'All videos include captions and transcripts' },
  { icon: 'keyboard', title: 'Keyboard Navigation', description: 'Full keyboard navigation support throughout the site' },
  { icon: 'screen_reader', title: 'Screen Reader Support', description: 'Compatible with popular screen readers' },
  { icon: 'language', title: 'Multiple Languages', description: 'Available in multiple languages for global accessibility' },
];

export default function Accessibility() {
  return (
    <PremiumPageTemplate
      title="Accessibility"
      subtitle="We're committed to making Global SafeTravel accessible to everyone"
      icon="accessibility"
    >
      <motion.div
        className="bg-zinc-900 rounded-xl p-8 shadow-lg mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
        <p className="text-slate-400 leading-relaxed">
          Global SafeTravel is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
        </p>
      </motion.div>

      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-8">Accessibility Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-zinc-900 rounded-xl p-6 shadow-lg"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-yellow-400 text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-yellow-500/10 to-transparent rounded-xl p-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4">Report Accessibility Issues</h2>
        <p className="text-slate-400 mb-4">
          If you encounter any accessibility barriers while using Global SafeTravel, please let us know so we can improve.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-yellow-500/90 transition-all"
        >
          Report an Issue
        </motion.button>
      </motion.div>
    </PremiumPageTemplate>
  );
}
