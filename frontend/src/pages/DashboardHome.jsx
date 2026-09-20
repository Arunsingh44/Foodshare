import React from 'react';
import { useAuth } from '../context/AuthContext';
import DonorOverview from './donor/DonorOverview';
import NGOOverview from './ngo/NGOOverview';
import VolunteerOverview from './volunteer/VolunteerOverview';
import AdminOverview from './admin/AdminOverview';

const DashboardHome = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'ngo':
      return <NGOOverview />;
    case 'volunteer':
      return <VolunteerOverview />;
    case 'admin':
      return <AdminOverview />;
    case 'donor':
    default:
      return <DonorOverview />;
  }
};

export default DashboardHome;
