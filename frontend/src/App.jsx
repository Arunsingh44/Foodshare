import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import BrowseDonationsPage from './pages/BrowseDonationsPage';
import VolunteerPage from './pages/VolunteerPage';
import NGORegistrationPage from './pages/NGORegistrationPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import DashboardHome from './pages/DashboardHome';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

import AddDonation from './pages/donor/AddDonation';
import MyDonations from './pages/donor/MyDonations';
import DonorRequests from './pages/donor/DonorRequests';

import NearbyDonations from './pages/ngo/NearbyDonations';
import NGORequests from './pages/ngo/NGORequests';
import NGOHistory from './pages/ngo/NGOHistory';

import NearbyPickups from './pages/volunteer/NearbyPickups';
import VolunteerDeliveries from './pages/volunteer/VolunteerDeliveries';
import Leaderboard from './pages/volunteer/Leaderboard';

import AdminUsers from './pages/admin/AdminUsers';
import AdminDonations from './pages/admin/AdminDonations';
import AdminNGOVerification from './pages/admin/AdminNGOVerification';
import AdminOverview from './pages/admin/AdminOverview';
import RequestsRouter from './pages/RequestsRouter';
import NearbyRouter from './pages/NearbyRouter';

function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/browse" element={<BrowseDonationsPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/ngo-registration" element={<NGORegistrationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Authenticated dashboard */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />

        {/* Donor */}
        <Route
          path="/dashboard/add-donation"
          element={
            <ProtectedRoute allowedRoles={['donor']}>
              <AddDonation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-donations"
          element={
            <ProtectedRoute allowedRoles={['donor']}>
              <MyDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/requests"
          element={
            <ProtectedRoute allowedRoles={['donor', 'ngo']}>
              <RequestsRouter />
            </ProtectedRoute>
          }
        />

        {/* NGO / Volunteer shared route */}
        <Route
          path="/dashboard/nearby"
          element={
            <ProtectedRoute allowedRoles={['ngo', 'volunteer']}>
              <NearbyRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/history"
          element={
            <ProtectedRoute allowedRoles={['ngo']}>
              <NGOHistory />
            </ProtectedRoute>
          }
        />

        {/* Volunteer */}
        <Route
          path="/dashboard/deliveries"
          element={
            <ProtectedRoute allowedRoles={['volunteer']}>
              <VolunteerDeliveries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/leaderboard"
          element={
            <ProtectedRoute allowedRoles={['volunteer']}>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/donations"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDonations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/ngo-verification"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminNGOVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/analytics"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminOverview />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
