import React from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiAward, FiMapPin } from 'react-icons/fi';

const perks = [
  { icon: FiMapPin, title: 'Flexible Pickups', desc: 'Choose deliveries near you that fit your schedule.' },
  { icon: FiAward, title: 'Earn Rewards', desc: 'Collect points and badges for every completed delivery.' },
  { icon: FiTruck, title: 'Real Impact', desc: 'Every delivery you make gets meals to people who need them.' },
];

const VolunteerPage = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <h1 className="section-title mb-4">Become a Volunteer</h1>
    <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-12">
      Help bridge the gap between surplus food and hungry communities by picking up and delivering donations.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mb-14">
      {perks.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="glass-card p-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Icon size={22} />
          </div>
          <h3 className="font-display font-semibold mb-2 text-dark dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{desc}</p>
        </div>
      ))}
    </div>

    <Link to="/register" className="btn-primary">
      Sign Up as a Volunteer
    </Link>
  </div>
);

export default VolunteerPage;
