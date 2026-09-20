import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ngoService } from '../../services/miscServices';

const AdminNGOVerification = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    ngoService
      .getAll({ verificationStatus: 'pending' })
      .then((res) => setNgos(res.ngos))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await ngoService.verify(id, decision);
      toast.success(`NGO ${decision}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">NGO Verification</h1>
      <p className="text-sm text-slate-500 mb-8">Review pending NGO registrations.</p>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-24" />)}</div>
      ) : ngos.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">No pending NGO verifications.</div>
      ) : (
        <div className="space-y-4">
          {ngos.map((n) => (
            <div key={n._id} className="glass-card p-5 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-dark dark:text-white">{n.organizationName}</p>
                <p className="text-xs text-slate-500">Reg No: {n.registrationNumber} • Contact: {n.user?.name}</p>
                {n.description && <p className="text-xs text-slate-400 mt-1 max-w-md">{n.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDecision(n._id, 'verified')} className="btn-primary !py-1.5 !px-4 text-xs">
                  Verify
                </button>
                <button
                  onClick={() => handleDecision(n._id, 'rejected')}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-danger border-2 border-danger hover:bg-danger hover:text-white transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNGOVerification;
