import React from 'react';
import { useAuth } from '../context/AuthContext';
import NearbyDonationsNGO from './ngo/NearbyDonations';
import NearbyPickupsVolunteer from './volunteer/NearbyPickups';

const NearbyRouter = () => {
  const { user } = useAuth();
  return user?.role === 'volunteer' ? <NearbyPickupsVolunteer /> : <NearbyDonationsNGO />;
};

export default NearbyRouter;
