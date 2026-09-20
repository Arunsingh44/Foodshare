import React from 'react';
import { motion } from 'framer-motion';

// Tailwind's JIT compiler needs full static class names, so dynamic
// `bg-${color}/10` strings would be purged from the production build.
const colorClasses = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
};

const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-5 flex items-center gap-4"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color] || colorClasses.primary}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-dark dark:text-white">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  </motion.div>
);

export default StatCard;
