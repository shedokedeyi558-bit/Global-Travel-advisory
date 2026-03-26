import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const news = [
  { date: 'Jan 15, 2024', title: 'Global SafeTravel Launches AI-Powered Risk Scoring', category: 'Product' },
  { date: 'Jan 10, 2024', title: 'Expands to 200+ Countries with Real-Time Data', category: 'Expansion' },
  { date: 'Jan 5, 2024', title: 'Raises $5M in Series A Funding', category: 'Funding' },
  { date: 'Dec 28, 2023', title: 'Reaches 500,000 Active Users Milestone', category: 'Milestone' },
  { date: 'Dec 20, 2023', title: 'Partners with WHO for Health Data Integration', category: 'Partnership' },
  { date: 'Dec 15, 2023', title: 'Launches Mobile App for iOS and Android', category: 'Product' },
];

export default function Newsroom() {
  return (
    <PremiumPageTemplate
      title="Newsroom"
      subtitle="Latest news and updates from Global SafeTravel"
      icon="newspaper"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Latest News</h2>
          <div className="space-y-6">
            {news.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-zinc-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-primary"
                whileHover={{ x: 8 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-slate-300">{item.date}</span>
                      <span className="text-xs bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-yellow-400 font-semibold hover:underline whitespace-nowrap"
                  >
                    Read More →
                  </motion.button>
                </div>
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
          <h2 className="text-2xl font-bold mb-4">Press Kit</h2>
          <p className="text-slate-400 mb-6">
            Download our press kit including logos, company information, and media assets.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-yellow-500/90 transition-all"
          >
            Download Press Kit
          </motion.button>
        </motion.div>
      </div>
    </PremiumPageTemplate>
  );
}
