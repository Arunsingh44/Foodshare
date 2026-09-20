import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  FiHome,
  FiPlusCircle,
  FiList,
  FiUser,
  FiBell,
  FiSettings,
  FiMap,
  FiAward,
  FiUsers,
  FiPieChart,
  FiCheckSquare,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/common/Logo';

const linksByRole = {
  donor: [
    { to: '/dashboard', label: 'Overview', icon: FiHome, end: true },
    { to: '/dashboard/add-donation', label: 'Add Donation', icon: FiPlusCircle },
    { to: '/dashboard/my-donations', label: 'My Donations', icon: FiList },
    { to: '/dashboard/requests', label: 'Requests', icon: FiCheckSquare },
  ],
  ngo: [
    { to: '/dashboard', label: 'Overview', icon: FiHome, end: true },
    { to: '/dashboard/nearby', label: 'Nearby Donations', icon: FiMap },
    { to: '/dashboard/requests', label: 'My Requests', icon: FiCheckSquare },
    { to: '/dashboard/history', label: 'History', icon: FiList },
  ],
  volunteer: [
    { to: '/dashboard', label: 'Overview', icon: FiHome, end: true },
    { to: '/dashboard/nearby', label: 'Nearby Pickups', icon: FiMap },
    { to: '/dashboard/deliveries', label: 'Deliveries', icon: FiCheckSquare },
    { to: '/dashboard/leaderboard', label: 'Leaderboard', icon: FiAward },
  ],
  admin: [
    { to: '/dashboard', label: 'Overview', icon: FiHome, end: true },
    { to: '/dashboard/users', label: 'Users', icon: FiUsers },
    { to: '/dashboard/donations', label: 'Donations', icon: FiList },
    { to: '/dashboard/ngo-verification', label: 'NGO Verification', icon: FiCheckSquare },
    { to: '/dashboard/analytics', label: 'Analytics', icon: FiPieChart },
  ],
};

const DashboardLayout = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const links = linksByRole[user?.role] || linksByRole.donor;

  return (
    <div className="min-h-screen flex bg-background dark:bg-dark">
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-white/10 p-6 gap-2">
        <Link to="/" className="text-lg mb-8">
          <Logo />
        </Link>

        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            <Icon /> {label}
          </NavLink>
        ))}

        <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-slate-200 dark:border-white/10">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            <FiUser /> Profile
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`
            }
          >
            <FiBell /> Notifications
          </NavLink>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <FiSettings /> {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
