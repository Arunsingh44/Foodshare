import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { adminService } from '../../services/miscServices';

const roleColors = {
  admin: 'bg-danger/10 text-danger',
  donor: 'bg-primary/10 text-primary',
  ngo: 'bg-secondary/10 text-secondary',
  volunteer: 'bg-accent/20 text-yellow-700',
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  const load = () => {
    setLoading(true);
    adminService
      .getUsers({ search: search || undefined, role: role || undefined })
      .then((res) => setUsers(res.users))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(load, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, role]);

  const handleBan = async (user) => {
    try {
      await adminService.toggleBan(user._id);
      toast.success(`${user.name} ${user.isBanned ? 'unbanned' : 'banned'}`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.name}"? This cannot be undone.`)) return;
    try {
      await adminService.deleteUser(user._id);
      toast.success('User deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">User Management</h1>
      <p className="text-sm text-slate-500 mb-8">View, ban, or remove platform users.</p>

      <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input-field pl-11" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input-field sm:w-48" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All Roles</option>
          <option value="donor">Donor</option>
          <option value="ngo">NGO</option>
          <option value="volunteer">Volunteer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}</div>
      ) : (
        <div className="overflow-x-auto glass-card p-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-white/10">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-slate-100 dark:border-white/5">
                  <td className="p-4 font-medium text-dark dark:text-white">{u.name}</td>
                  <td className="p-4 text-slate-500">{u.email}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleColors[u.role] || ''}`}>{u.role}</span>
                  </td>
                  <td className="p-4">{u.isBanned ? <span className="text-danger text-xs font-semibold">Banned</span> : <span className="text-success text-xs font-semibold">Active</span>}</td>
                  <td className="p-4 flex gap-2">
                    {u.role !== 'admin' && (
                      <>
                        <button onClick={() => handleBan(u)} className="text-xs font-semibold text-secondary hover:underline">
                          {u.isBanned ? 'Unban' : 'Ban'}
                        </button>
                        <button onClick={() => handleDelete(u)} className="text-xs font-semibold text-danger hover:underline">
                          Delete
                        </button>
                      </>
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

export default AdminUsers;
