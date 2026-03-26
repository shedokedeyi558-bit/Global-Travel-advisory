import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authModalMode } = useAuth();
  const [isLogin, setIsLogin] = useState(authModalMode === 'login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Update isLogin when modal mode changes
  useEffect(() => {
    setIsLogin(authModalMode === 'login');
  }, [authModalMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      setEmail('');
      setPassword('');
      setLoading(false);
      login(); // Set logged in state
      onClose();
      // Navigate to home after login
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
              className="w-full max-w-sm bg-zinc-900 border border-yellow-500/30 rounded-xl shadow-2xl shadow-yellow-500/10 p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-3 right-3 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </motion.button>

              {/* Header */}
              <motion.div
                className="text-center mb-5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-2xl text-yellow-400">lock</span>
                </div>
                <h1 className="text-2xl font-bold mb-1 text-white">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-xs text-slate-300">
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
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">Email</label>
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-yellow-500/30 bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-slate-600"
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
                  <label className="block text-xs font-semibold mb-1.5 text-slate-300">Password</label>
                  <motion.input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-yellow-500/30 bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-slate-600"
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
                  className="w-full bg-yellow-500 text-black font-bold py-2 text-sm rounded-lg hover:bg-yellow-400 transition-all mt-4 disabled:opacity-50"
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
                <p className="text-xs text-slate-300">
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
                className="mt-4 pt-4 border-t border-yellow-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-center text-xs text-slate-300 mb-3">Or continue with</p>
                <div className="flex gap-3">
                  {['Google', 'GitHub'].map((provider) => (
                    <motion.button
                      key={provider}
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 py-1.5 text-xs rounded-lg border border-yellow-500/30 text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
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
