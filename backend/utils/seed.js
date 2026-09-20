/**
 * Seed script - populates the database with sample data for local development/demo.
 * Run with: npm run seed
 */
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('../config/db');
const User = require('../models/User');
const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const Volunteer = require('../models/Volunteer');

const run = async () => {
  await connectDB();

  console.log('Clearing existing demo data...');
  await Promise.all([
    User.deleteMany({ email: { $regex: /@foodshare-demo\.test$/ } }),
    Donation.deleteMany({}),
    NGO.deleteMany({}),
    Volunteer.deleteMany({}),
  ]);

  console.log('Creating users...');
  const admin = await User.create({
    name: 'Site Admin',
    email: 'admin@foodshare-demo.test',
    password: 'Admin@1234',
    role: 'admin',
    isEmailVerified: true,
    city: 'Mumbai',
    location: { type: 'Point', coordinates: [72.8777, 19.076] },
  });

  const donor = await User.create({
    name: 'Rohan\'s Kitchen',
    email: 'donor@foodshare-demo.test',
    password: 'Donor@1234',
    role: 'donor',
    isEmailVerified: true,
    city: 'Mumbai',
    location: { type: 'Point', coordinates: [72.8258, 18.9647] },
  });

  const ngoUser = await User.create({
    name: 'Hope Foundation',
    email: 'ngo@foodshare-demo.test',
    password: 'Ngo@12345',
    role: 'ngo',
    isEmailVerified: true,
    ngoVerificationStatus: 'verified',
    city: 'Mumbai',
    location: { type: 'Point', coordinates: [72.85, 19.0] },
  });

  const volunteerUser = await User.create({
    name: 'Asha Volunteer',
    email: 'volunteer@foodshare-demo.test',
    password: 'Volunteer@123',
    role: 'volunteer',
    isEmailVerified: true,
    city: 'Mumbai',
    location: { type: 'Point', coordinates: [72.83, 19.02] },
  });

  console.log('Creating NGO profile...');
  await NGO.create({
    user: ngoUser._id,
    organizationName: 'Hope Foundation Trust',
    registrationNumber: 'NGO-2019-00123',
    description: 'Serving hot meals to underserved communities across Mumbai.',
    focusAreas: ['Hunger relief', 'Elderly care'],
    verificationStatus: 'verified',
    verifiedAt: new Date(),
  });

  console.log('Creating volunteer profile...');
  await Volunteer.create({
    user: volunteerUser._id,
    vehicleType: 'bike',
    maxDistanceKm: 15,
    availability: 'evenings',
    rewardPoints: 40,
    completedDeliveries: 4,
  });

  console.log('Creating sample donations...');
  const now = Date.now();
  await Donation.create([
    {
      donor: donor._id,
      foodName: 'Vegetable Biryani',
      category: 'Cooked Food',
      description: 'Freshly cooked biryani from a wedding event, still warm.',
      quantity: { value: 40, unit: 'plates' },
      cookedTime: new Date(now - 60 * 60 * 1000),
      expiryTime: new Date(now + 5 * 60 * 60 * 1000),
      pickupTime: { start: new Date(now + 30 * 60 * 1000), end: new Date(now + 3 * 60 * 60 * 1000) },
      pickupAddress: 'Bandra West, Mumbai',
      location: { type: 'Point', coordinates: [72.8296, 19.0596] },
      freshnessScore: 85,
    },
    {
      donor: donor._id,
      foodName: 'Assorted Bread & Pastries',
      category: 'Bakery',
      description: 'End-of-day surplus from the bakery, still fresh.',
      quantity: { value: 25, unit: 'packets' },
      cookedTime: new Date(now - 3 * 60 * 60 * 1000),
      expiryTime: new Date(now + 20 * 60 * 60 * 1000),
      pickupTime: { start: new Date(now + 60 * 60 * 1000), end: new Date(now + 4 * 60 * 60 * 1000) },
      pickupAddress: 'Andheri East, Mumbai',
      location: { type: 'Point', coordinates: [72.8697, 19.1136] },
      freshnessScore: 70,
    },
  ]);

  console.log('Seed complete. Demo accounts (password shown for local dev only):');
  console.table([
    { role: 'admin', email: admin.email, password: 'Admin@1234' },
    { role: 'donor', email: donor.email, password: 'Donor@1234' },
    { role: 'ngo', email: ngoUser.email, password: 'Ngo@12345' },
    { role: 'volunteer', email: volunteerUser.email, password: 'Volunteer@123' },
  ]);

  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
