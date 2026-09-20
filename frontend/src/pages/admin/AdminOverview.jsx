import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { FiUsers, FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi';
import StatCard from '../../components/dashboard/StatCard';
import { adminService } from '../../services/miscServices';

const COLORS = ['#00C853', '#00ACC1', '#FFD600', '#22C55E', '#EF4444', '#818CF8', '#F472B6', '#FB923C', '#94A3B8'];

const AdminOverview = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getAnalytics()
      .then((res) => setAnalytics(res.analytics))
      .finally(() => setLoading(false));
  }, []);

  const trendData = (analytics?.monthlyTrend || []).map((m) => ({
    month: `${m._id.month}/${m._id.year}`,
    donations: m.count,
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Admin Dashboard</h1>
      <p className="text-sm text-slate-500 mb-8">Platform-wide metrics and moderation tools.</p>

      {loading || !analytics ? (
        <div className="grid sm:grid-cols-4 gap-5">{[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24" />)}</div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <StatCard icon={FiUsers} label="Total Users" value={analytics.totalUsers} color="primary" />
            <StatCard icon={FiPackage} label="Total Donations" value={analytics.totalDonations} color="secondary" />
            <StatCard icon={FiCheckCircle} label="Meals Saved" value={analytics.mealsSaved} color="success" />
            <StatCard icon={FiClock} label="Pending NGO Reviews" value={analytics.pendingNGOVerifications} color="accent" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold mb-4 text-dark dark:text-white">Donation Trend (6 months)</h2>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="donations" stroke="#00C853" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card p-6">
              <h2 className="font-display font-semibold mb-4 text-dark dark:text-white">Donations by Category</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={analytics.categoryBreakdown}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={(entry) => entry._id}
                  >
                    {analytics.categoryBreakdown.map((entry, i) => (
                      <Cell key={entry._id} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOverview;
