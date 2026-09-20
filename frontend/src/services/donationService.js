import api from './api';

export const donationService = {
  getAll: (params) => api.get('/donations', { params }).then((r) => r.data),
  getById: (id) => api.get(`/donations/${id}`).then((r) => r.data),
  create: (formData) =>
    api
      .post('/donations', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data),
  update: (id, data) => api.put(`/donations/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/donations/${id}`).then((r) => r.data),
  getMyDonations: () => api.get('/donations/my-donations').then((r) => r.data),
};

export const requestService = {
  create: (donationId, message) => api.post('/requests', { donationId, message }).then((r) => r.data),
  accept: (id) => api.put(`/requests/${id}/accept`).then((r) => r.data),
  reject: (id) => api.put(`/requests/${id}/reject`).then((r) => r.data),
  collect: (id) => api.put(`/requests/${id}/collect`).then((r) => r.data),
  deliver: (id) => api.put(`/requests/${id}/deliver`).then((r) => r.data),
  getMyRequests: (as) => api.get('/requests/my-requests', { params: { as } }).then((r) => r.data),
};
