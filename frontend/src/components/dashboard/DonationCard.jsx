import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin } from 'react-icons/fi';

const statusColors = {
  available: 'bg-success/10 text-success',
  requested: 'bg-accent/20 text-yellow-700',
  accepted: 'bg-secondary/10 text-secondary',
  collected: 'bg-primary/10 text-primary',
  delivered: 'bg-slate-200 text-slate-600',
  expired: 'bg-danger/10 text-danger',
  cancelled: 'bg-slate-200 text-slate-500',
};

const DonationCard = ({ donation, actionLabel, onAction, actionDisabled }) => {
  const hoursLeft = Math.max(
    0,
    Math.round((new Date(donation.expiryTime).getTime() - Date.now()) / (1000 * 60 * 60))
  );

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card overflow-hidden flex flex-col"
    >
      <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl">
        {donation.images?.[0]?.url ? (
          <img src={donation.images[0].url} alt={donation.foodName} className="w-full h-full object-cover" />
        ) : (
          '🍱'
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-dark dark:text-white">{donation.foodName}</h3>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize whitespace-nowrap ${statusColors[donation.status] || ''}`}>
            {donation.status}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-3">{donation.category} • {donation.quantity?.value} {donation.quantity?.unit}</p>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
          <FiMapPin size={13} /> {donation.pickupAddress}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <FiClock size={13} /> {hoursLeft > 0 ? `Expires in ${hoursLeft}h` : 'Expired'}
        </div>

        {donation.donor?.name && (
          <p className="text-xs text-slate-400 mb-4">Donated by {donation.donor.name}</p>
        )}

        {actionLabel && (
          <button
            onClick={() => onAction?.(donation)}
            disabled={actionDisabled}
            className="btn-primary w-full mt-auto !py-2 text-sm disabled:opacity-50"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default DonationCard;
