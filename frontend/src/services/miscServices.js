import api from './api';

export const ngoService = {
  register: (formData) =>
    api
      .post('/ngos/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data),
  getAll: (params) => api.get('/ngos', { params }).then((r) => r.data),
  getById: (id) => api.get(`/ngos/${id}`).then((r) => r.data),
  verify: (id, decision, notes) => api.put(`/ngos/${id}/verify`, { decision, notes }).then((r) => r.data),
};

export const volunteerService = {
  upsertProfile: (data) => api.post('/volunteers/profile', data).then((r) => r.data),
  getMyProfile: () => api.get('/volunteers/profile').then((r) => r.data),
  getNearbyPickups: (lng, lat, maxDistanceKm) =>
    api.get('/volunteers/nearby-pickups', { params: { lng, lat, maxDistanceKm } }).then((r) => r.data),
  getLeaderboard: () => api.get('/volunteers/leaderboard').then((r) => r.data),
};

export const notificationService = {
  getMine: (unreadOnly) => api.get('/notifications', { params: { unreadOnly } }).then((r) => r.data),
  markAsRead: (id) => api.put(`/notifications/${id}/read`).then((r) => r.data),
  markAllAsRead: () => api.put('/notifications/read-all').then((r) => r.data),
};

export const adminService = {
  getUsers: (params) => api.get('/admin/users', { params }).then((r) => r.data),
  toggleBan: (id) => api.put(`/admin/users/${id}/ban`).then((r) => r.data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`).then((r) => r.data),
  getDonations: (params) => api.get('/admin/donations', { params }).then((r) => r.data),
  cancelDonation: (id) => api.put(`/admin/donations/${id}/cancel`).then((r) => r.data),
  getAnalytics: () => api.get('/admin/analytics').then((r) => r.data),
};

export const userService = {
  updateProfile: (data) => api.put('/users/profile', data).then((r) => r.data),
  updateAvatar: (formData) =>
    api
      .put('/users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data),
  changePassword: (data) => api.put('/users/change-password', data).then((r) => r.data),
  getById: (id) => api.get(`/users/${id}`).then((r) => r.data),
};
