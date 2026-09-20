import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('foodshare_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { user } = await authService.getMe();
      setUser(user);
    } catch (err) {
      localStorage.removeItem('foodshare_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem('foodshare_token', token);
    setUser(user);
    toast.success(`Welcome back, ${user.name}!`);
    return user;
  };

  const register = async (data) => {
    const { token, user } = await authService.register(data);
    localStorage.setItem('foodshare_token', token);
    setUser(user);
    toast.success(`Welcome to FoodShare+, ${user.name}!`);
    return user;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // ignore network errors on logout
    }
    localStorage.removeItem('foodshare_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout, refreshUser: loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
