const { getDistanceKm } = require('./geoUtils');

/**
 * Estimate a 0-100 freshness score based on how much of the food's
 * shelf life (cookedTime -> expiryTime) remains right now.
 * This is a deterministic heuristic, not a call to an external ML model,
 * but is structured so a real model call could replace the calculation.
 */
const computeFreshnessScore = ({ cookedTime, expiryTime }) => {
  const now = Date.now();
  const expiry = new Date(expiryTime).getTime();
  const cooked = cookedTime ? new Date(cookedTime).getTime() : now - 60 * 60 * 1000; // assume 1h old if unknown

  if (now >= expiry) return 0;

  const totalWindow = expiry - cooked;
  const remaining = expiry - now;
  if (totalWindow <= 0) return 50;

  const score = Math.round((remaining / totalWindow) * 100);
  return Math.max(0, Math.min(100, score));
};

/**
 * Predict expiry risk level for dashboards / alerts.
 */
const predictExpiryRisk = (expiryTime) => {
  const hoursLeft = (new Date(expiryTime).getTime() - Date.now()) / (1000 * 60 * 60);
  if (hoursLeft <= 0) return 'expired';
  if (hoursLeft <= 1) return 'critical';
  if (hoursLeft <= 3) return 'high';
  if (hoursLeft <= 8) return 'medium';
  return 'low';
};

/**
 * Flag likely duplicate donations: same donor, same food name, submitted
 * within a short window of each other.
 */
const isDuplicateDonation = (newDonation, recentDonationsFromDonor) => {
  const windowMs = 2 * 60 * 60 * 1000; // 2 hours
  return recentDonationsFromDonor.some((d) => {
    const sameName = d.foodName.trim().toLowerCase() === newDonation.foodName.trim().toLowerCase();
    const withinWindow = Math.abs(new Date(d.createdAt) - Date.now()) < windowMs;
    return sameName && withinWindow;
  });
};

/**
 * Rank nearby NGOs/volunteers by distance for a given donation location.
 * candidates: [{ _id, location: { coordinates: [lng, lat] }, ... }]
 */
const suggestNearbyRecipients = (donationCoordinates, candidates, limit = 5) => {
  return candidates
    .map((c) => ({
      ...c,
      distanceKm: Number(getDistanceKm(donationCoordinates, c.location.coordinates).toFixed(2)),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
};

module.exports = {
  computeFreshnessScore,
  predictExpiryRisk,
  isDuplicateDonation,
  suggestNearbyRecipients,
};
