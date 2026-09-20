import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { requestService } from '../../services/donationService';

const NGORequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    requestService
      .getMyRequests()
      .then((res) => setRequests(res.requests))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCollect = async (id) => {
    try {
      await requestService.collect(id);
      toast.success('Marked as collected');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update request');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">My Requests</h1>
      <p className="text-sm text-slate-500 mb-8">Track the status of donations you've requested.</p>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-20" />)}</div>
      ) : requests.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">You haven't made any requests yet.</div>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r._id} className="glass-card p-5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-dark dark:text-white">{r.donation?.foodName}</p>
                <p className="text-xs text-slate-500">Donor: {r.donor?.name} • {r.distanceKm} km away</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
                  {r.status.replace('_', ' ')}
                </span>
                {r.status === 'accepted' && (
                  <button onClick={() => handleCollect(r._id)} className="btn-primary !py-1.5 !px-4 text-xs">
                    Mark Collected
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NGORequests;
