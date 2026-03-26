import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const cookieTypes = [
  { name: 'Essential Cookies', description: 'Required for the website to function properly. These cannot be disabled.' },
  { name: 'Analytics Cookies', description: 'Help us understand how visitors use our website to improve performance.' },
  { name: 'Marketing Cookies', description: 'Used to track visitors across websites to display relevant advertisements.' },
  { name: 'Preference Cookies', description: 'Remember your preferences and settings for a better user experience.' },
];

export default function CookiePolicy() {
  return (
    <PremiumPageTemplate
      title="Cookie Policy"
      subtitle="How we use cookies to enhance your experience"
      icon="cookie"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-zinc-900 rounded-xl p-8 shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
          <p className="text-slate-400 leading-relaxed">
            Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences, understand how you use our site, and improve your experience. We use cookies in accordance with applicable laws and regulations.
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, idx) => (
              <motion.div
                key={idx}
                className="bg-zinc-900 rounded-xl p-6 shadow-lg"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-2">{cookie.name}</h3>
                <p className="text-slate-400 text-sm">{cookie.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-yellow-500/10 to-transparent rounded-xl p-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Your Cookie Choices</h2>
          <p className="text-slate-400 mb-4">
            You can control and/or delete cookies as you wish. Most browsers allow you to refuse cookies and alert you when a cookie is being sent. However, blocking cookies may affect your ability to use certain features of our website.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-yellow-500/90 transition-all"
          >
            Manage Cookie Preferences
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-zinc-900 rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-slate-400">
            If you have questions about our use of cookies, please contact us at privacy@globalsafetravel.com
          </p>
        </motion.div>
      </div>
    </PremiumPageTemplate>
  );
}
