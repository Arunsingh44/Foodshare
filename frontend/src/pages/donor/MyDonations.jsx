import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import { donationService } from '../../services/donationService';
import DonationCard from '../../components/dashboard/DonationCard';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    donationService
      .getMyDonations()
      .then((res) => setDonations(res.donations))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (donation) => {
    if (!window.confirm(`Delete donation "${donation.foodName}"?`)) return;
    try {
      await donationService.remove(donation._id);
      toast.success('Donation deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete donation');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">My Donations</h1>
      <p className="text-sm text-slate-500 mb-8">Manage the food donations you've listed.</p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-72" />)}
        </div>
      ) : donations.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">
          You haven't posted any donations yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((d) => (
            <DonationCard
              key={d._id}
              donation={d}
              actionLabel={
                ['collected', 'delivered'].includes(d.status) ? null : (
                  <span className="flex items-center gap-2"><FiTrash2 /> Delete</span>
                )
              }
              actionDisabled={['collected', 'delivered'].includes(d.status)}
              onAction={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
