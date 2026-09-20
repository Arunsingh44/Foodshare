import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiShield, FiBarChart2, FiZap, FiMoon, FiBell } from 'react-icons/fi';

const features = [
  { icon: FiMapPin, title: 'Live maps', desc: 'Track pickup locations, distances, and routes in real time.' },
  { icon: FiZap, title: 'Freshness alerts', desc: 'A simple expiry model flags tickets that need urgent pickup.' },
  { icon: FiShield, title: 'Verified NGOs', desc: 'Every NGO is manually reviewed before it can claim a ticket.' },
  { icon: FiBarChart2, title: 'Impact analytics', desc: 'See meals saved, CO₂ reduced, and trends over time.' },
  { icon: FiBell, title: 'Instant notifications', desc: 'Know the moment a ticket is claimed or collected.' },
  { icon: FiMoon, title: 'Dark mode', desc: 'A considered dark theme for browsing day or night.' },
];

const Features = () => (
  <section className="py-24 bg-white dark:bg-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="eyebrow mb-3">Under the hood</p>
        <h2 className="section-title">Built for every role at the table</h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-slate-200 dark:bg-white/10 rounded-xl2 overflow-hidden border border-slate-200 dark:border-white/10">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white dark:bg-dark p-7"
          >
            <div className="w-11 h-11 rounded-full border-2 border-primary text-primary flex items-center justify-center mb-4">
              <Icon size={19} />
            </div>
            <h3 className="font-display font-semibold mb-1.5 text-dark dark:text-white">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
