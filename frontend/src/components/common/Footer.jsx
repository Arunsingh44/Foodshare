import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiMail } from 'react-icons/fi';
import Logo from './Logo';

const Footer = () => (
  <footer className="bg-dark text-slate-300 mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <div className="text-xl text-white mb-3">
          <Logo />
        </div>
        <p className="text-sm text-slate-400">Connecting Surplus Food with People Who Need It.</p>
        <div className="flex gap-3 mt-4">
          {[FiInstagram, FiTwitter, FiFacebook, FiMail].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3">Platform</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/how-it-works" className="hover:text-primary">How It Works</Link></li>
          <li><Link to="/browse" className="hover:text-primary">Browse Donations</Link></li>
          <li><Link to="/volunteer" className="hover:text-primary">Become a Volunteer</Link></li>
          <li><Link to="/ngo-registration" className="hover:text-primary">Register Your NGO</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3">Company</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
          <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} FoodShare+. All rights reserved.
    </div>
  </footer>
);

export default Footer;
