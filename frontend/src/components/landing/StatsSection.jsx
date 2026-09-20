import React from 'react';
import { FiPackage, FiUsers, FiHeart, FiGlobe } from 'react-icons/fi';
import AnimatedCounter from '../common/AnimatedCounter';

const stats = [
  { icon: FiPackage, value: 24850, suffix: '+', label: 'Meals Rescued' },
  { icon: FiUsers, value: 3200, suffix: '+', label: 'Active Donors' },
  { icon: FiHeart, value: 340, suffix: '+', label: 'NGO Partners' },
  { icon: FiGlobe, value: 18500, suffix: ' kg', label: 'CO₂ Saved' },
];

// Styled as a strip of ticket stubs — the same perforated-edge language as
// the hero, so the count-up numbers read as "tickets redeemed" rather than
// a generic stat band.
const StatsSection = () => (
  <section className="py-16 bg-dark relative overflow-hidden">
    <div className="absolute inset-0 paper-grain opacity-40 pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="eyebrow text-secondary-light mb-8 text-center">The tally so far</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map(({ icon: Icon, value, suffix, label }, i) => (
          <div
            key={label}
            className="relative bg-white/5 border border-white/10 rounded-xl px-5 py-6 text-center"
          >
            <span
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-dark border border-white/10"
              aria-hidden="true"
            />
            <Icon className="mx-auto mb-3 text-primary" size={22} />
            <p className="font-mono text-2xl md:text-3xl font-bold text-white">
              <AnimatedCounter value={value} suffix={suffix} />
            </p>
            <p className="text-xs text-slate-400 mt-1 tracking-wide">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
