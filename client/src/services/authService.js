import api from './api';

export const authService = {
  register: (payload) => api.post('/auth/register', payload),
  login: (payload) => api.post('/auth/login', payload),
  getMe: () => api.get('/auth/me'),
  updateProfile: (payload) => api.put('/auth/profile', payload),
  logout: () => api.post('/auth/logout'),
};
