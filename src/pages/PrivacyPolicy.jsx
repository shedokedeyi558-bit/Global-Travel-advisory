import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const sections = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, such as when you create an account, search for destinations, or contact us. This may include your name, email address, and search history.'
  },
  {
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, send you technical notices and support messages, and respond to your comments and questions.'
  },
  {
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
  },
  {
    title: 'Third-Party Services',
    content: 'We may share your information with third-party service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.'
  },
  {
    title: 'Your Rights',
    content: 'You have the right to access, update, or delete your personal information at any time by contacting us. You may also opt-out of receiving promotional communications.'
  },
  {
    title: 'Changes to This Policy',
    content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.'
  },
];

export default function PrivacyPolicy() {
  return (
    <PremiumPageTemplate
      title="Privacy Policy"
      subtitle="Last updated: January 2024"
      icon="privacy_tip"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-blue-900 dark:text-blue-100">
            This Privacy Policy explains how Global SafeTravel collects, uses, discloses, and safeguards your information when you visit our website and use our services.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section) => (
            <motion.div
              key={section.title}
              className="bg-zinc-900 rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 font-bold">
                  {idx + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-slate-400 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-zinc-950 rounded-xl p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-slate-400">
            If you have any questions about this Privacy Policy, please contact us at privacy@globalsafetravel.com
          </p>
        </motion.div>
      </div>
    </PremiumPageTemplate>
  );
}
