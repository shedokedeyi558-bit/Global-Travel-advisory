import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const steps = [
  {
    icon: 'location_on',
    title: 'Select Destination',
    description: 'Enter your destination to see a comprehensive safety overview including health, crime, and environmental data.'
  },
  {
    icon: 'notifications_active',
    title: 'Get Real-time Alerts',
    description: 'Receive push notifications for immediate threats, weather changes, or travel policy updates while you\'re on the move.'
  },
  {
    icon: 'verified_user',
    title: 'Travel with Confidence',
    description: 'Access emergency local contacts and \'Safe Zone\' recommendations curated by experts and fellow travelers.'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-text-primary">Simple steps to safer travels</h2>
          <p className="mt-4 text-lg text-text-secondary">Our platform integrates global data from 50+ reliable sources.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl border border-border bg-surface p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-2xl">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">{step.title}</h3>
              <p className="text-text-secondary">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
