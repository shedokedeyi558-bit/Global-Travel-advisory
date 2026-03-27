import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SafetyPreview() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Subscribed:', email);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-background" id="safety">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="rounded-2xl bg-surface border border-border text-text-primary p-6 sm:p-8 lg:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 max-w-2xl">
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Safety insights preview
            </motion.h2>

            <motion.p
              className="text-text-secondary text-lg mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join 500,000+ travelers who get weekly intelligence digests on global trends, emerging travel zones, and expert safety hacks.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { icon: 'newsmode', title: 'Breaking Updates', desc: 'Instant notifications on flight delays & gate changes.' },
                { icon: 'policy', title: 'Entry Requirements', desc: 'Live visa and health documentation tracker.' }
              ].map((item, idx) => (
                    <motion.div
                      className="flex items-start gap-3"
                      whileHover={{ x: 8 }}
                    >
                      <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                      <div>
                        <h5 className="font-bold text-text-primary">{item.title}</h5>
                        <p className="text-sm text-text-secondary">{item.desc}</p>
                      </div>
                    </motion.div>
              ))}
            </motion.div>

            <motion.form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={handleSubscribe}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-surface-2 border border-border px-6 py-3 text-text-primary placeholder-text-tertiary focus:ring-primary focus:border-primary focus:outline-none"
                aria-label="Email for newsletter subscription"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-primary px-8 py-3 font-bold text-white hover:bg-primary-dark transition-all"
              >
                Subscribe Now
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
