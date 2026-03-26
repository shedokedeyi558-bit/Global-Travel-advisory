import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const terms = [
  { title: 'Acceptance of Terms', content: 'By accessing and using Global SafeTravel, you accept and agree to be bound by the terms and provision of this agreement.' },
  { title: 'Use License', content: 'Permission is granted to temporarily download one copy of the materials (information or software) on Global SafeTravel for personal, non-commercial transitory viewing only.' },
  { title: 'Disclaimer', content: 'The materials on Global SafeTravel are provided on an "as is" basis. Global SafeTravel makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.' },
  { title: 'Limitations', content: 'In no event shall Global SafeTravel or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials.' },
  { title: 'Accuracy of Materials', content: 'The materials appearing on Global SafeTravel could include technical, typographical, or photographic errors. Global SafeTravel does not warrant that any of the materials are accurate, complete, or current.' },
  { title: 'Links', content: 'Global SafeTravel has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Global SafeTravel.' },
  { title: 'Modifications', content: 'Global SafeTravel may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.' },
  { title: 'Governing Law', content: 'These terms and conditions are governed by and construed in accordance with the laws of California, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.' },
];

export default function TermsOfService() {
  return (
    <PremiumPageTemplate
      title="Terms of Service"
      subtitle="Last updated: January 2024"
      icon="description"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-900 dark:text-amber-100">
            Please read these Terms of Service carefully before using Global SafeTravel. Your access to and use of the service is conditioned on your acceptance of and compliance with these terms.
          </p>
        </motion.div>

        <div className="space-y-6">
          {terms.map((term) => (
            <motion.div
              key={term.title}
              className="bg-zinc-900 rounded-xl p-8 shadow-lg border-l-4 border-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <h3 className="text-xl font-bold mb-3">{idx + 1}. {term.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {term.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-yellow-500/5 to-transparent rounded-xl p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4">Questions?</h3>
          <p className="text-slate-400">
            If you have any questions about these Terms of Service, please contact us at legal@globalsafetravel.com
          </p>
        </motion.div>
      </div>
    </PremiumPageTemplate>
  );
}
