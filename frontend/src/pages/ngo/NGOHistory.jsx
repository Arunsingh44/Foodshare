import React, { useEffect, useState } from 'react';
import { requestService } from '../../services/donationService';

const NGOHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestService
      .getMyRequests()
      .then((res) => setRequests(res.requests.filter((r) => ['delivered', 'collected'].includes(r.status))))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Donation History</h1>
      <p className="text-sm text-slate-500 mb-8">Completed pickups and deliveries.</p>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}</div>
      ) : requests.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">No completed donations yet.</div>
      ) : (
        <div className="overflow-x-auto glass-card p-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-white/10">
                <th className="p-4">Food</th>
                <th className="p-4">Donor</th>
                <th className="p-4">Collected</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="border-b border-slate-100 dark:border-white/5">
                  <td className="p-4 font-medium text-dark dark:text-white">{r.donation?.foodName}</td>
                  <td className="p-4 text-slate-500">{r.donor?.name}</td>
                  <td className="p-4 text-slate-500">
                    {r.collectedAt ? new Date(r.collectedAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="p-4 capitalize">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NGOHistory;
