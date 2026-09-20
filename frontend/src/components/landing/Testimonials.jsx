import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Restaurant Owner',
    quote: "FoodShare+ made it effortless to donate our end-of-day surplus instead of throwing it away.",
  },
  {
    name: 'Hope Foundation',
    role: 'NGO Partner',
    quote: 'We now receive fresh meal donations daily, helping us feed more families than ever before.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Volunteer',
    quote: 'The route alerts and nearby pickups save me so much time getting food where it needs to go.',
  },
];

// Styled like handwritten index cards pinned to a board — quieter than the
// ticket motif, but keeps the same warm-paper, mono-attribution language.
const Testimonials = () => (
  <section className="py-24 bg-kraft/40 dark:bg-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="eyebrow mb-3">From the network</p>
        <h2 className="section-title">Notes from people using it</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -1 : 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white dark:bg-dark rounded-xl p-7 shadow-soft border border-slate-100 dark:border-white/10"
          >
            <p className="font-display italic text-5xl text-primary/30 leading-none mb-2">"</p>
            <p className="text-slate-700 dark:text-slate-300 -mt-6 mb-6">{t.quote}</p>
            <div className="pt-4 border-t border-dashed border-slate-200 dark:border-white/10 font-mono text-xs">
              <p className="font-bold text-dark dark:text-white">{t.name}</p>
              <p className="text-slate-500 uppercase tracking-wide mt-0.5">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
