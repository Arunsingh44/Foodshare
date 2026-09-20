import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const CallToAction = () => (
  <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-primary via-primary to-secondary p-10 md:p-16 text-center text-white"
    >
      <div className="absolute top-0 left-0 right-0 h-px border-t-2 border-dashed border-white/30" />
      <p className="eyebrow text-white/80 mb-4">Next stop: your kitchen</p>
      <h2 className="relative font-display text-3xl md:text-4xl font-semibold mb-4">
        Ready to turn surplus into a ticket someone redeems?
      </h2>
      <p className="relative max-w-xl mx-auto mb-8 text-white/90">
        Join thousands of donors, NGOs, and volunteers already fighting food waste with FoodShare+.
      </p>
      <Link
        to="/register"
        className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold hover:-translate-y-0.5 transition-transform"
      >
        Get Started Today <FiArrowRight />
      </Link>
    </motion.div>
  </section>
);

export default CallToAction;
