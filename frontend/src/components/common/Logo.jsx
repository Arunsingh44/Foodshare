import React from 'react';

// A small mark instead of a stock emoji: a torn ticket stub shape, which
// carries the "rescue ticket" idea into the wordmark itself.
const Logo = ({ className = '' }) => (
  <span className={`flex items-center gap-2 font-display font-semibold ${className}`}>
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path
        d="M4 8a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v3.2a2 2 0 1 0 0 3.6V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.2a2 2 0 1 0 0-3.6V8z"
        fill="currentColor"
        className="text-primary"
      />
      <path d="M15 6.5v17" stroke="#F8FAFC" strokeWidth="1.5" strokeDasharray="1.5 3" strokeLinecap="round" />
    </svg>
    FoodShare<span className="text-secondary">+</span>
  </span>
);

export default Logo;
