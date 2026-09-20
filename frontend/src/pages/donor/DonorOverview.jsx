import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiCheckCircle, FiClock, FiPlusCircle } from 'react-icons/fi';
import StatCard from '../../components/dashboard/StatCard';
import { donationService } from '../../services/donationService';
import { useAuth } from '../../context/AuthContext';

const DonorOverview = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    donationService
      .getMyDonations()
      .then((res) => setDonations(res.donations))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: donations.length,
    delivered: donations.filter((d) => d.status === 'delivered').length,
    pending: donations.filter((d) => ['available', 'requested'].includes(d.status)).length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark dark:text-white">
            Welcome, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500">Here's what's happening with your donations.</p>
        </div>
        <Link to="/dashboard/add-donation" className="btn-primary">
          <FiPlusCircle /> Add Donation
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <StatCard icon={FiPackage} label="Total Donations" value={stats.total} color="primary" />
        <StatCard icon={FiCheckCircle} label="Delivered" value={stats.delivered} color="success" />
        <StatCard icon={FiClock} label="In Progress" value={stats.pending} color="secondary" />
      </div>

      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-lg mb-4 text-dark dark:text-white">Recent Donations</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 w-full" />)}
          </div>
        ) : donations.length === 0 ? (
          <p className="text-sm text-slate-500">No donations yet — add your first one to get started!</p>
        ) : (
          <div className="space-y-3">
            {donations.slice(0, 5).map((d) => (
              <div key={d._id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                <div>
                  <p className="font-semibold text-dark dark:text-white text-sm">{d.foodName}</p>
                  <p className="text-xs text-slate-500">{d.category} • {d.quantity?.value} {d.quantity?.unit}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorOverview;
