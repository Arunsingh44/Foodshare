import React from 'react';
import { motion } from 'framer-motion';

const values = [
  { title: 'Compassion', desc: 'Every meal saved represents dignity restored to someone in need.' },
  { title: 'Transparency', desc: 'Donors and NGOs can track exactly where food goes and how it helps.' },
  { title: 'Sustainability', desc: 'Reducing food waste means reducing the environmental cost of every meal.' },
];

const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
      <h1 className="section-title">About FoodShare+</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        FoodShare+ was built on a simple belief: no edible food should go to waste while people go hungry.
        We connect restaurants, hotels, caterers, and households with NGOs and volunteers who can rescue
        surplus food and get it to communities that need it most.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {values.map((v, i) => (
        <motion.div
          key={v.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6 text-center"
        >
          <h3 className="font-display font-semibold text-lg mb-2 text-dark dark:text-white">{v.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{v.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="glass-card p-10 text-center">
      <h2 className="font-display text-2xl font-bold text-dark dark:text-white mb-3">Our Mission</h2>
      <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        To build the most trusted, easy-to-use platform for food rescue — reducing waste, cutting carbon
        emissions, and putting meals on tables that would otherwise go empty.
      </p>
    </div>
  </div>
);

export default AboutPage;
