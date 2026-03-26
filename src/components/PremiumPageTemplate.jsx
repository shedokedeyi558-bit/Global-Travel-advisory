import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { useScrollToTop } from '../utils/useScrollToTop';

export default function PremiumPageTemplate({ title, subtitle, icon, children, gradient = 'from-yellow-500/10 to-transparent', backgroundImage }) {
  useScrollToTop();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-black text-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <motion.section
          className={`relative py-20 bg-gradient-to-b ${gradient}`}
          style={backgroundImage ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          } : {}}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Dark overlay for better text readability */}
          {backgroundImage && (
            <div className="absolute inset-0 bg-black/55 -z-10"></div>
          )}

          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {icon && (
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="material-symbols-outlined text-4xl text-yellow-400">{icon}</span>
                </motion.div>
              )}
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-4 text-white drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)' }}>
                {title}
              </h1>
              <p className="text-xl text-white drop-shadow-lg max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>
                {subtitle}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
