import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { donationService } from '../services/donationService';
import DonationCard from '../components/dashboard/DonationCard';

const CATEGORIES = [
  'Cooked Food', 'Raw Food', 'Bakery', 'Vegetables', 'Fruits',
  'Beverages', 'Packaged Food', 'Dairy', 'Desserts',
];

const BrowseDonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('-createdAt');

  useEffect(() => {
    setLoading(true);
    const params = { status: 'available', sort };
    if (search) params.search = search;
    if (category) params.category = category;

    donationService
      .getAll(params)
      .then((res) => setDonations(res.donations))
      .finally(() => setLoading(false));
  }, [search, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="section-title">Browse Available Donations</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Find surplus food near you and request a pickup for your NGO or as a volunteer.
        </p>
      </div>

      <div className="glass-card p-4 mb-10 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input-field pl-11"
            placeholder="Search by food name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field sm:w-52" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="input-field sm:w-52" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="-createdAt">Newest First</option>
          <option value="expiryTime">Expiring Soon</option>
          <option value="-quantity.value">Largest Quantity</option>
        </select>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="skeleton h-72" />)}
        </div>
      ) : donations.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">
          No available donations match your filters right now.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((d) => <DonationCard key={d._id} donation={d} />)}
        </div>
      )}
    </div>
  );
};

export default BrowseDonationsPage;
