import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openAuthModal, isLoggedIn, logout } = useAuth();
  const isDestinationPage = location.pathname.startsWith('/destination/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-surface/95 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 lg:px-20 border-b border-border shadow-md"
      >
      <div className="flex items-center gap-3">
        {isDestinationPage && (
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mr-2 p-2 hover:bg-surface-2 rounded-lg transition-colors"
            title="Back to home"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </motion.button>
        )}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          title="Go to home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold">
            G
          </div>
          <h2 className="text-lg font-bold tracking-tight text-text-primary hidden sm:block">Global SafeTravel</h2>
        </motion.button>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {[
          { label: 'Destinations', path: '/destinations' },
          { label: 'Health', path: '/health-data' },
          { label: 'Airports', path: '/airport-info' },
          { label: 'AI Chat', path: '/chat' },
          { label: 'AI Features', path: '/ai-features' }
        ].map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`text-sm font-medium relative group transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-primary'
              }`}
              transition={{ duration: 0.2 }}
            >
              {item.label}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: isActive ? '100%' : 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
          title="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
        {isLoggedIn ? (
          <>
            <motion.button
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </motion.button>
            <motion.button
              onClick={() => { logout(); navigate('/'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-all"
            >
              <LogOut size={16} />
              Sign Out
            </motion.button>
          </>
        ) : (
          <motion.button
            onClick={() => openAuthModal('signup')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all"
          >
            Get Started
          </motion.button>
        )}
      </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 z-[60] md:hidden bg-surface/95 backdrop-blur-md border-b border-border shadow-md"
        >
          <nav className="flex flex-col p-4 space-y-2">
            {[
              { label: 'Destinations', path: '/destinations' },
              { label: 'Health', path: '/health-data' },
              { label: 'Airports', path: '/airport-info' },
              { label: 'AI Chat', path: '/chat' },
              { label: 'AI Features', path: '/ai-features' }
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-5 py-4 rounded-xl font-semibold text-base transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-surface-2 hover:text-primary'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  {item.label}
                </motion.button>
              );
            })}

            {isLoggedIn && (
              <motion.button
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-3 rounded-lg font-medium text-text-secondary hover:bg-surface-2 hover:text-primary transition-colors flex items-center gap-2"
                whileHover={{ x: 4 }}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </motion.button>
            )}

            {/* Divider */}
            {!isLoggedIn && <div className="my-2 border-t border-border" />}

            {/* Auth Buttons in Mobile Menu */}
            {isLoggedIn ? (
              <motion.button
                onClick={() => {
                  logout();
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-3 rounded-lg font-medium text-text-secondary hover:bg-red-600/20 hover:text-red-400 transition-colors flex items-center gap-2 mt-2"
                whileHover={{ x: 4 }}
              >
                <LogOut size={18} />
                Sign Out
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-3 rounded-lg font-medium text-text-secondary hover:bg-surface-2 hover:text-primary transition-colors"
                  whileHover={{ x: 4 }}
                >
                  Log in
                </motion.button>
                <motion.button
                  onClick={() => {
                    openAuthModal('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg font-bold text-white bg-primary hover:bg-primary-dark transition-all mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
              </>
            )}
          </nav>
        </motion.div>
      )}
    </>
  );
}
