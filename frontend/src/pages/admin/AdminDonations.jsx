import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminService } from '../../services/miscServices';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const load = () => {
    setLoading(true);
    adminService
      .getDonations({ status: status || undefined })
      .then((res) => setDonations(res.donations))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this donation?')) return;
    try {
      await adminService.cancelDonation(id);
      toast.success('Donation cancelled');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Donation Management</h1>
      <p className="text-sm text-slate-500 mb-8">Moderate and oversee all donations on the platform.</p>

      <select className="input-field sm:w-52 mb-6" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="available">Available</option>
        <option value="requested">Requested</option>
        <option value="accepted">Accepted</option>
        <option value="collected">Collected</option>
        <option value="delivered">Delivered</option>
        <option value="expired">Expired</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}</div>
      ) : (
        <div className="overflow-x-auto glass-card p-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-white/10">
                <th className="p-4">Food</th>
                <th className="p-4">Donor</th>
                <th className="p-4">Status</th>
                <th className="p-4">Posted</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d._id} className="border-b border-slate-100 dark:border-white/5">
                  <td className="p-4 font-medium text-dark dark:text-white">{d.foodName}</td>
                  <td className="p-4 text-slate-500">{d.donor?.name}</td>
                  <td className="p-4 capitalize">{d.status}</td>
                  <td className="p-4 text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    {!['cancelled', 'delivered'].includes(d.status) && (
                      <button onClick={() => handleCancel(d._id)} className="text-xs font-semibold text-danger hover:underline">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDonations;
