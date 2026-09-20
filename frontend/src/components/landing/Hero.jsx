import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlayCircle, FiHome, FiTruck, FiUsers } from 'react-icons/fi';

// The signature element: a "rescue ticket" — because a donation really is
// a ticket racing a clock. Perforated stub styling comes from the .ticket
// utility in index.css; the route line at the bottom draws itself in on
// load using Framer Motion's native SVG path-length animation.
const RescueTicket = () => (
  <motion.div
    initial={{ opacity: 0, y: 24, rotate: -3 }}
    animate={{ opacity: 1, y: 0, rotate: -2 }}
    transition={{ duration: 0.7, delay: 0.15 }}
    className="ticket paper-grain w-full max-w-sm mx-auto p-7 sm:p-8"
    style={{ '--tilt': '-2deg' }}
  >
    <div className="relative flex items-start justify-between mb-5">
      <div>
        <p className="eyebrow">Rescue Ticket</p>
        <p className="font-mono text-2xl font-bold tracking-tight mt-0.5">NO. 024,850</p>
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 2.2, rotate: -28 }}
        animate={{ opacity: 1, scale: 1, rotate: -10 }}
        transition={{ delay: 0.75, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="stamp-badge border-primary text-primary bg-primary/10"
      >
        Rescued
      </motion.span>
    </div>

    <div className="relative space-y-2.5 font-mono text-sm">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-slate-500 dark:text-slate-400">ITEM</span>
        <span className="flex-1 border-b border-dotted border-slate-400/50 mx-2 translate-y-[-3px]" />
        <span className="font-semibold">Vegetable Biryani</span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-slate-500 dark:text-slate-400">QTY</span>
        <span className="flex-1 border-b border-dotted border-slate-400/50 mx-2 translate-y-[-3px]" />
        <span className="font-semibold">40 plates</span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-slate-500 dark:text-slate-400">FROM</span>
        <span className="flex-1 border-b border-dotted border-slate-400/50 mx-2 translate-y-[-3px]" />
        <span className="font-semibold">Bandra West</span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-slate-500 dark:text-slate-400">WINDOW</span>
        <span className="flex-1 border-b border-dotted border-slate-400/50 mx-2 translate-y-[-3px]" />
        <span className="font-semibold text-primary-dark dark:text-primary-light">5h 12m left</span>
      </div>
    </div>

    {/* Route: kitchen -> volunteer -> table, drawn in on load */}
    <div className="relative mt-7 pt-6 border-t border-dashed border-slate-400/40">
      <svg viewBox="0 0 280 40" className="w-full h-10" fill="none">
        <motion.path
          d="M20 20 C 80 20, 90 4, 140 20 S 220 36, 260 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="1 8"
          strokeLinecap="round"
          className="text-secondary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease: 'easeOut' }}
        />
        {[
          { cx: 20, Icon: FiHome, label: 'Kitchen' },
          { cx: 140, Icon: FiTruck, label: 'Volunteer' },
          { cx: 260, Icon: FiUsers, label: 'Table' },
        ].map(({ cx, Icon }, i) => (
          <g key={cx}>
            <motion.circle
              cx={cx}
              cy={20}
              r="11"
              className="fill-background dark:fill-dark stroke-secondary"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2 + i * 0.2, type: 'spring', stiffness: 300, damping: 14 }}
            />
            <foreignObject x={cx - 7} y={13} width="14" height="14">
              <Icon size={14} className="text-secondary-dark dark:text-secondary-light" />
            </foreignObject>
          </g>
        ))}
      </svg>
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400 -mt-1">
        <span>Kitchen</span>
        <span>Volunteer</span>
        <span>Table</span>
      </div>
    </div>
  </motion.div>
);

const Hero = () => (
  <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
    <div className="absolute inset-0 paper-grain pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow mb-4">Food Rescue Network</p>
        <h1 className="font-display text-4xl md:text-[3.4rem] leading-[1.08] font-semibold text-dark dark:text-white">
          Connecting surplus food with the people who need it —
          <span className="italic font-medium text-primary-dark dark:text-primary-light"> one rescue ticket</span> at a time.
        </h1>
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-lg">
          Restaurants, hotels, and households list what's left over. NGOs and volunteers
          claim the ticket and get it to a table before the clock runs out.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/register" className="btn-primary">
            Donate Food <FiArrowRight />
          </Link>
          <Link to="/how-it-works" className="btn-secondary">
            <FiPlayCircle /> See How It Works
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-6 font-mono text-xs text-slate-500 dark:text-slate-400">
          <span><strong className="text-dark dark:text-white">24,850</strong> meals rescued</span>
          <span className="w-px h-4 bg-slate-300 dark:bg-slate-700" />
          <span><strong className="text-dark dark:text-white">340+</strong> NGO partners</span>
        </div>
      </motion.div>

      <RescueTicket />
    </div>
  </section>
);

export default Hero;
