import React, { useEffect, useState } from 'react';
import { FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi';
import StatCard from '../../components/dashboard/StatCard';
import { requestService } from '../../services/donationService';
import { useAuth } from '../../context/AuthContext';

const NGOOverview = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestService
      .getMyRequests()
      .then((res) => setRequests(res.requests))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: requests.length,
    delivered: requests.filter((r) => r.status === 'delivered').length,
    active: requests.filter((r) => ['pending', 'accepted', 'in_transit'].includes(r.status)).length,
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">
        Welcome, {user?.name} 👋
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        {user?.ngoVerificationStatus === 'verified'
          ? 'Your NGO is verified — you can accept donations.'
          : 'Your NGO verification is ' + (user?.ngoVerificationStatus || 'pending') + '.'}
      </p>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <StatCard icon={FiPackage} label="Total Requests" value={stats.total} color="primary" />
        <StatCard icon={FiCheckCircle} label="Delivered" value={stats.delivered} color="success" />
        <StatCard icon={FiClock} label="Active" value={stats.active} color="secondary" />
      </div>

      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-lg mb-4 text-dark dark:text-white">Recent Activity</h2>
        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}</div>
        ) : requests.length === 0 ? (
          <p className="text-sm text-slate-500">No requests yet — browse nearby donations to get started.</p>
        ) : (
          <div className="space-y-3">
            {requests.slice(0, 5).map((r) => (
              <div key={r._id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                <p className="font-semibold text-dark dark:text-white text-sm">{r.donation?.foodName}</p>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
                  {r.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOOverview;
