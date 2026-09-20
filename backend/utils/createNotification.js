const Notification = require('../models/Notification');

/**
 * Create an in-app notification. Fire-and-forget-safe: caller should not
 * let a notification failure break the primary request flow.
 */
const createNotification = async ({ user, type, title, message, relatedDonation, relatedRequest }) => {
  try {
    return await Notification.create({
      user,
      type,
      title,
      message,
      relatedDonation,
      relatedRequest,
    });
  } catch (err) {
    console.error('Failed to create notification:', err.message);
    return null;
  }
};

module.exports = createNotification;
