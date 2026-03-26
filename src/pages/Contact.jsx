import { useState } from 'react';
import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const contactMethods = [
  { icon: 'mail', title: 'Email', value: 'Shedokedeyi558@gmail.com', description: 'We respond within 24 hours' },
  { icon: 'phone', title: 'Phone', value: '08105775818', description: 'Available 24/7' },
  { icon: 'location_on', title: 'Office', value: 'Lagos, Nigeria', description: 'Visit us in person' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://formspree.io/f/xbdzpgqg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PremiumPageTemplate
      title="Get in Touch"
      subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      icon="mail"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* Contact Methods */}
        {contactMethods.map((method) => (
          <motion.div
            key={method.title}
            className="bg-zinc-900 rounded-xl p-8 shadow-lg"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: contactMethods.indexOf(method) * 0.1 }}
          >
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-yellow-400 text-2xl">{method.icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{method.title}</h3>
            <p className="text-yellow-400 font-semibold mb-2">{method.value}</p>
            <p className="text-sm text-slate-400">{method.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="bg-zinc-900 rounded-2xl p-12 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <motion.input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-yellow-500/20 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your name"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <motion.input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-yellow-500/20 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="your@email.com"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <motion.textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-yellow-500/20 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32 resize-none"
                placeholder="Your message..."
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              className="w-full bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-500/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>

            {submitted && (
              <motion.div
                className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}

            {error && (
              <motion.div
                className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✗ {error}
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </PremiumPageTemplate>
  );
}
