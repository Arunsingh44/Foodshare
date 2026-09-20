import React, { useEffect, useState } from 'react';
import { FiAward } from 'react-icons/fi';
import { volunteerService } from '../../services/miscServices';

const medalColors = ['text-yellow-500', 'text-slate-400', 'text-amber-700'];

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    volunteerService
      .getLeaderboard()
      .then((res) => setLeaderboard(res.leaderboard))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Volunteer Leaderboard</h1>
      <p className="text-sm text-slate-500 mb-8">Top contributors by reward points.</p>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}</div>
      ) : (
        <div className="glass-card divide-y divide-slate-100 dark:divide-white/10">
          {leaderboard.map((v, i) => (
            <div key={v._id} className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <span className={`font-display font-bold text-lg w-8 ${medalColors[i] || 'text-slate-500'}`}>
                  {i < 3 ? <FiAward /> : `#${i + 1}`}
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                <div>
                  <p className="font-semibold text-dark dark:text-white text-sm">{v.user?.name}</p>
                  <p className="text-xs text-slate-500">{v.user?.city}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{v.rewardPoints} pts</p>
                <p className="text-xs text-slate-500">{v.completedDeliveries} deliveries</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
