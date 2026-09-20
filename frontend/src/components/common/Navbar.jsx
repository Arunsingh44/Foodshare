import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Logo from './Logo';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/browse', label: 'Browse Donations' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-dark/70 border-b border-slate-100 dark:border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-xl">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-200 hover:scale-105 transition-transform"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/notifications')}
                aria-label="Notifications"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 hover:scale-105 transition-transform"
              >
                <FiBell />
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn-secondary !py-2 !px-4 text-sm">
                Dashboard
              </button>
              <button onClick={logout} className="text-sm font-medium text-slate-500 hover:text-danger">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary">
                Log In
              </Link>
              <Link to="/register" className="btn-primary !py-2 !px-5 text-sm">
                Donate Now
              </Link>
            </div>
          )}

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-slate-100 dark:border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-slate-600 dark:text-slate-300 font-medium">
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-col gap-2">
                {user ? (
                  <>
                    <button onClick={() => navigate('/dashboard')} className="btn-primary w-full">
                      Dashboard
                    </button>
                    <button onClick={logout} className="text-danger font-medium">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary w-full text-center">
                      Log In
                    </Link>
                    <Link to="/register" onClick={() => setOpen(false)} className="btn-primary w-full text-center">
                      Donate Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
