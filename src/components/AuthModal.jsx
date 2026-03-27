import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authModalMode } = useAuth();
  const [isLogin, setIsLogin] = useState(authModalMode === 'login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    setIsLogin(authModalMode === 'login');
  }, [authModalMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setEmail('');
      setPassword('');
      setLoading(false);
      login();
      onClose();
      navigate('/');
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Blurred Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40"
            style={{ backdropFilter: 'blur(10px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              className="w-full max-w-sm bg-surface border border-border rounded-xl shadow-lg p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-3 right-3 p-1.5 hover:bg-surface-2 rounded-lg transition-colors"
              >
                <X size={20} className="text-text-secondary" />
              </motion.button>

              {/* Header */}
              <motion.div
                className="text-center mb-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-2xl text-primary">lock</span>
                </div>
                <h1 className="text-2xl font-bold mb-1 text-text-primary">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-xs text-text-secondary">
                  {isLogin ? 'Sign in to your account' : 'Join Global SafeTravel'}
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-xs font-semibold mb-1.5 text-text-secondary">Email</label>
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder-text-tertiary"
                    placeholder="your@email.com"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-xs font-semibold mb-1.5 text-text-secondary">Password</label>
                  <motion.input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder-text-tertiary"
                    placeholder="••••••••"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                {isLogin && (
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-white font-bold py-2 text-sm rounded-lg hover:bg-primary-dark transition-all mt-4 disabled:opacity-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                </motion.button>
              </form>

              {/* Toggle */}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs text-text-secondary">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                    }}
                    className="text-primary font-semibold hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </motion.div>

              {/* Social Login */}
              <motion.div
                className="mt-4 pt-4 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-center text-xs text-text-secondary mb-3">Or continue with</p>
                <div className="flex gap-3">
                  {['Google', 'GitHub'].map((provider) => (
                    <motion.button
                      key={provider}
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 py-1.5 text-xs rounded-lg border border-border text-text-secondary hover:bg-surface-2 hover:text-primary transition-colors"
                    >
                      {provider}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
