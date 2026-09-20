import React from 'react';
import { useAuth } from '../context/AuthContext';
import DonorRequests from './donor/DonorRequests';
import NGORequests from './ngo/NGORequests';

// Donor sees requests made ON their donations; NGO sees requests THEY made.
const RequestsRouter = () => {
  const { user } = useAuth();
  return user?.role === 'ngo' ? <NGORequests /> : <DonorRequests />;
};

export default RequestsRouter;
