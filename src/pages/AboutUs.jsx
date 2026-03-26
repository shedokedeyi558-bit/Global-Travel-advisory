import { motion } from 'framer-motion';
import PremiumPageTemplate from '../components/PremiumPageTemplate';

const teamMembers = [
  { name: 'Sarah Johnson', role: 'Founder & CEO', icon: 'person' },
  { name: 'Michael Chen', role: 'CTO', icon: 'engineering' },
  { name: 'Emma Rodriguez', role: 'Head of Safety', icon: 'security' },
  { name: 'James Wilson', role: 'Data Scientist', icon: 'analytics' },
];

const values = [
  { title: 'Trust', description: 'We provide accurate, verified travel safety information', icon: 'verified_user' },
  { title: 'Innovation', description: 'Cutting-edge technology for real-time travel intelligence', icon: 'lightbulb' },
  { title: 'Accessibility', description: 'Making safety information available to everyone', icon: 'accessibility' },
  { title: 'Community', description: 'Empowering travelers to share and learn together', icon: 'group' },
];

export default function AboutUs() {
  return (
    <PremiumPageTemplate
      title="About Global SafeTravel"
      subtitle="Empowering travelers with real-time safety intelligence since 2024"
      icon="info"
    >
      {/* Mission Section */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-zinc-900 rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Global SafeTravel is dedicated to making international travel safer and more informed. We combine real-time data from 50+ reliable sources to provide travelers with comprehensive safety insights, health advisories, and local intelligence for every destination on Earth.
          </p>
        </div>
      </motion.div>

      {/* Values Grid */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="bg-zinc-900 rounded-xl p-8 shadow-lg"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-yellow-400 text-2xl">{value.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl p-8 border border-primary/10"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="material-symbols-outlined text-yellow-400 text-3xl">{member.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-center">{member.name}</h3>
              <p className="text-sm text-slate-400 text-center mt-2">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PremiumPageTemplate>
  );
}
