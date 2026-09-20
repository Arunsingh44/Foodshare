import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

// On-brand rather than generic: this page is styled as an expired rescue
// ticket, which is a more specific joke than a stock "lost" illustration.
const NotFoundPage = () => (
  <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden paper-grain">
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.5 }}
      className="ticket paper-grain w-full max-w-sm p-8"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="text-left">
          <p className="eyebrow">Rescue Ticket</p>
          <p className="font-mono text-2xl font-bold tracking-tight mt-0.5">NO. 000,404</p>
        </div>
        <span className="stamp-badge border-danger text-danger bg-danger/10">Expired</span>
      </div>

      <h1 className="font-display text-3xl font-semibold text-dark dark:text-white mb-2">
        This page didn't make pickup in time.
      </h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-sm">
        The ticket you're looking for has already expired or never existed. Let's get you back to something still fresh.
      </p>
      <Link to="/" className="btn-primary w-full">
        <FiHome /> Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
