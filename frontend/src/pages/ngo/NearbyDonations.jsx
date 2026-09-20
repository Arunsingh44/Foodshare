import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { donationService, requestService } from '../../services/donationService';
import DonationCard from '../../components/dashboard/DonationCard';
import { useAuth } from '../../context/AuthContext';

const NearbyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    const [lng, lat] = user?.location?.coordinates || [0, 0];
    donationService
      .getAll({ status: 'available', lng, lat, maxDistanceKm: 25 })
      .then((res) => setDonations(res.donations))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequest = async (donation) => {
    try {
      await requestService.create(donation._id, `Requesting pickup for ${user.name}`);
      toast.success('Request sent to the donor!');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send request');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Nearby Donations</h1>
      <p className="text-sm text-slate-500 mb-8">Available food donations within 25km of your registered location.</p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-72" />)}
        </div>
      ) : donations.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">No available donations nearby right now.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((d) => (
            <DonationCard key={d._id} donation={d} actionLabel="Request Pickup" onAction={handleRequest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyDonations;
