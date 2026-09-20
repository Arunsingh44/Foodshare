import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  { q: 'How does FoodShare+ work?', a: 'Donors post surplus food listings with pickup details. NGOs and volunteers browse nearby listings and request to collect them. The donor approves a request, and the food is picked up and delivered before it expires.' },
  { q: 'Is FoodShare+ free to use?', a: 'Yes, FoodShare+ is completely free for donors, NGOs, and volunteers.' },
  { q: 'How are NGOs verified?', a: 'NGOs submit their registration details and documents, which our admin team manually reviews before granting verified status.' },
  { q: 'What happens if food isn\'t picked up in time?', a: 'Donations that pass their expiry time are automatically marked as expired and removed from the active listings.' },
  { q: 'Can households donate food, not just restaurants?', a: 'Absolutely — anyone with safe, edible surplus food is welcome to donate.' },
  { q: 'How do volunteers earn rewards?', a: 'Volunteers earn points for every completed delivery, which appear on the public leaderboard along with badges for milestones.' },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-dark dark:text-white"
      >
        {q}
        <FiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300">{a}</div>}
    </div>
  );
};

const FAQPage = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="text-center mb-14">
      <h1 className="section-title">Frequently Asked Questions</h1>
    </div>
    <div className="space-y-4">
      {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
    </div>
  </div>
);

export default FAQPage;
