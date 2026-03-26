import { motion } from 'framer-motion';

export default function ModernCard({ 
  children, 
  title, 
  icon: Icon, 
  delay = 0,
  className = '',
  noPadding = false 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`
        group relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-slate-800/50 to-slate-900/50
        border border-slate-700/50 hover:border-primary/30
        shadow-lg hover:shadow-2xl hover:shadow-primary/10
        transition-all duration-300
        ${className}
      `}
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className={noPadding ? '' : 'p-6 md:p-8'}>
        {/* Header */}
        {(title || Icon) && (
          <div className="flex items-center gap-3 mb-6">
            {Icon && (
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Icon size={24} className="text-primary" />
              </div>
            )}
            {title && (
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Body */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
