import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Destinations', path: '/destinations' },
      { label: 'Safety Ratings', path: '/safety-ratings' },
      { label: 'Live Maps', path: '/live-maps' },
      { label: 'Health Data', path: '/health-data' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Newsroom', path: '/newsroom' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Accessibility', path: '/accessibility' }
    ]
  }
];

export default function Footer() {
  const navigate = useNavigate();
  const { openAuthModal } = useAuth();

  return (
    <motion.footer
      className="bg-surface border-t border-border py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          <motion.div
            className="col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                G
              </div>
              <h2 className="text-lg font-bold tracking-tight text-text-primary">Global SafeTravel</h2>
            </div>
            <p className="text-text-secondary text-sm max-w-xs mb-6">Empowering global citizens with reliable data to explore the world with confidence and security.</p>
            <div className="flex gap-4">
              {['language', 'alternate_email', 'campaign'].map((icon) => (
                <motion.a
                  key={icon}
                  href="#"
                  className="text-text-secondary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
            >
              <h4 className="font-bold mb-6 text-text-primary">{section.title}</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.button
                      onClick={() => navigate(link.path)}
                      className="hover:text-primary transition-colors text-left"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-xs text-text-tertiary">© 2026 Global SafeTravel. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-text-tertiary">Data source: World Health Org, Interpol, NOAA</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
