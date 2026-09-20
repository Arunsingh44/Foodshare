import React, { useEffect, useState } from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import { notificationService } from '../services/miscServices';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    notificationService
      .getMine()
      .then((res) => setNotifications(res.notifications))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const markAllRead = async () => {
    await notificationService.markAllAsRead();
    load();
  };

  const markRead = async (id) => {
    await notificationService.markAsRead(id);
    load();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark dark:text-white mb-1">Notifications</h1>
          <p className="text-sm text-slate-500">Stay updated on your donations and requests.</p>
        </div>
        <button onClick={markAllRead} className="btn-secondary !py-2 !px-4 text-sm">
          Mark all as read
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16" />)}</div>
      ) : notifications.length === 0 ? (
        <div className="glass-card p-10 text-center text-slate-500">
          <FiBell className="mx-auto mb-3" size={28} />
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`glass-card p-5 flex items-start justify-between gap-4 ${!n.isRead ? 'border-l-4 border-primary' : ''}`}
            >
              <div>
                <p className="font-semibold text-dark dark:text-white text-sm">{n.title}</p>
                <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                <p className="text-xs text-slate-400 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.isRead && (
                <button onClick={() => markRead(n._id)} className="text-primary" aria-label="Mark as read">
                  <FiCheck />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
