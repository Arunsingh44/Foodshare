import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiSearch, FiTruck, FiSmile } from 'react-icons/fi';

const steps = [
  { icon: FiUpload, title: 'Post a donation', desc: "Donors list surplus food with photos, quantity, and a pickup window in minutes." },
  { icon: FiSearch, title: 'A ticket goes out', desc: 'Nearby NGOs and volunteers see it appear on the live map and claim it.' },
  { icon: FiTruck, title: 'Collect & deliver', desc: 'The claimant picks up the food and marks each stop as it happens.' },
  { icon: FiSmile, title: 'Ticket redeemed', desc: 'Food reaches a table instead of a bin — the ticket closes out "delivered."' },
];

// The donation lifecycle really is a sequence, so numbered stops are
// earned here (unlike a decorative 01/02/03). Styled as a route with a
// dashed line running through it, echoing the hero's ticket path.
const HowItWorks = () => (
  <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <p className="eyebrow mb-3">The route</p>
      <h2 className="section-title">From kitchen to table, four stops</h2>
    </div>

    <div className="relative">
      {/* connecting line, desktop only */}
      <div className="hidden md:block absolute top-9 left-0 right-0 h-px border-t-2 border-dashed border-secondary/30" />

      <div className="grid md:grid-cols-4 gap-10 md:gap-6">
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative text-center"
          >
            <div className="relative z-10 w-[72px] h-[72px] mx-auto rounded-full bg-background dark:bg-dark border-2 border-secondary flex items-center justify-center">
              <Icon size={26} className="text-secondary-dark dark:text-secondary-light" />
            </div>
            <p className="font-mono text-xs text-secondary-dark dark:text-secondary-light tracking-widest mt-4">
              STOP {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display font-semibold text-lg mt-1 mb-2 text-dark dark:text-white">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
