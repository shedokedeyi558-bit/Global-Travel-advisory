import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const jobs = [
  { title: 'Senior React Developer', department: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'Data Scientist', department: 'Data', location: 'Remote', type: 'Full-time' },
  { title: 'Product Manager', department: 'Product', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'Safety Analyst', department: 'Safety', location: 'Remote', type: 'Full-time' },
  { title: 'Marketing Manager', department: 'Marketing', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'Customer Support Specialist', department: 'Support', location: 'Remote', type: 'Full-time' },
];

const benefits = [
  { icon: 'health_and_safety', title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
  { icon: 'trending_up', title: 'Growth', description: 'Professional development and career advancement' },
  { icon: 'schedule', title: 'Flexible Hours', description: 'Work-life balance with flexible scheduling' },
  { icon: 'public', title: 'Remote Work', description: 'Work from anywhere in the world' },
];

export default function Careers() {
  return (
    <PremiumPageTemplate
      title="Join Our Team"
      subtitle="Help us make travel safer for millions of people around the world"
      icon="work"
    >
      {/* Benefits Section */}
      <motion.div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Work With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="bg-zinc-900 rounded-xl p-8 shadow-lg"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-yellow-400 text-2xl">{benefit.icon}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-slate-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Open Positions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              className="bg-zinc-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ x: 8 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-sm bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full">{job.department}</span>
                    <span className="text-sm bg-slate-100 dark:bg-slate-700 text-slate-400 px-3 py-1 rounded-full">{job.location}</span>
                    <span className="text-sm bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">{job.type}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-yellow-500/90 transition-all"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PremiumPageTemplate>
  );
}
