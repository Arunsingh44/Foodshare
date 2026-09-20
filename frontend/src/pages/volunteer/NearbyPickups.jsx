import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { volunteerService } from '../../services/miscServices';
import { requestService } from '../../services/donationService';
import DonationCard from '../../components/dashboard/DonationCard';
import { useAuth } from '../../context/AuthContext';

const NearbyPickups = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    const [lng, lat] = user?.location?.coordinates || [0, 0];
    volunteerService
      .getNearbyPickups(lng, lat, 10)
      .then((res) => setDonations(res.donations))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = async (donation) => {
    try {
      await requestService.create(donation._id, `Volunteer pickup by ${user.name}`);
      toast.success('Pickup request sent!');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to request pickup');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Nearby Pickups</h1>
      <p className="text-sm text-slate-500 mb-8">Donations available for pickup within 10km of you.</p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-72" />)}
        </div>
      ) : donations.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">No pickups nearby at the moment.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((d) => (
            <DonationCard key={d._id} donation={d} actionLabel="Accept Pickup" onAction={handleAccept} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyPickups;
