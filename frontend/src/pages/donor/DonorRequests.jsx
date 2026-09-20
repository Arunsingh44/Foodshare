import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { requestService } from '../../services/donationService';

const statusColors = {
  pending: 'bg-accent/20 text-yellow-700',
  accepted: 'bg-secondary/10 text-secondary',
  rejected: 'bg-danger/10 text-danger',
  in_transit: 'bg-primary/10 text-primary',
  collected: 'bg-primary/10 text-primary',
  delivered: 'bg-slate-200 text-slate-600',
  cancelled: 'bg-slate-200 text-slate-500',
};

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    requestService
      .getMyRequests('donor')
      .then((res) => setRequests(res.requests))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAccept = async (id) => {
    try {
      await requestService.accept(id);
      toast.success('Request accepted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept request');
    }
  };

  const handleReject = async (id) => {
    try {
      await requestService.reject(id);
      toast.success('Request rejected');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reject request');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Pickup Requests</h1>
      <p className="text-sm text-slate-500 mb-8">Review and respond to requests from NGOs and volunteers.</p>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-20" />)}</div>
      ) : requests.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">No requests yet.</div>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r._id} className="glass-card p-5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-dark dark:text-white">{r.donation?.foodName}</p>
                <p className="text-xs text-slate-500">
                  Requested by {r.requestedBy?.name} ({r.requestedByRole}) • {r.distanceKm} km away
                </p>
                {r.message && <p className="text-xs text-slate-400 mt-1 italic">"{r.message}"</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[r.status] || ''}`}>
                  {r.status.replace('_', ' ')}
                </span>
                {r.status === 'pending' && (
                  <>
                    <button onClick={() => handleAccept(r._id)} className="btn-primary !py-1.5 !px-4 text-xs">
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(r._id)}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold text-danger border-2 border-danger hover:bg-danger hover:text-white transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorRequests;
