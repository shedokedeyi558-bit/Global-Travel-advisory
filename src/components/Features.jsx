import { motion } from 'framer-motion';
import mapImage from '../pictures/map.jpg';

const features = [
  {
    icon: 'analytics',
    title: 'AI-Powered Risk Scoring',
    description: 'Our proprietary algorithm processes thousands of data points to give you an accurate safety score.'
  },
  {
    icon: 'medical_services',
    title: 'Health & COVID Insights',
    description: 'Up-to-date entry requirements and local hospital ratings for every destination.'
  },
  {
    icon: 'group',
    title: 'Community Verified Reports',
    description: 'Read honest experiences and safety tips shared by our community of 1M+ active users.'
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-text-primary">Advanced features for the modern traveler</h2>
            <div className="space-y-6">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: features.indexOf(feature) * 0.1 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-text-primary">{feature.title}</h4>
                    <p className="text-text-secondary text-sm mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative bg-surface rounded-2xl p-8 overflow-hidden aspect-square flex items-center justify-center border border-border"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage: `url(${mapImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-surface rounded-2xl shadow-lg p-4 sm:p-6 w-64 sm:w-80 border border-border transform rotate-3">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-text-primary">Safety Index</h4>
                <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-green-700/30">High Safety</span>
              </div>

              <div className="space-y-4">
                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: '88%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-surface-2 rounded-lg border border-border">
                    <p className="text-[10px] uppercase text-text-tertiary font-bold">Health</p>
                    <motion.p
                      className="text-lg font-bold text-text-primary"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      92/100
                    </motion.p>
                  </div>
                  <div className="p-3 bg-surface-2 rounded-lg border border-border">
                    <p className="text-[10px] uppercase text-text-tertiary font-bold">Transport</p>
                    <motion.p
                      className="text-lg font-bold text-text-primary"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      85/100
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="rounded-xl bg-primary p-4 text-white"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-lg">verified</span>
                    <span className="text-xs font-bold">Advisor Tip</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">Avoid public gatherings in the Central Square area this weekend due to local festivities.</p>
                </motion.div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
