import api from './api';

export const automationService = {
  getLogs: (params = {}) => api.get('/automation/logs', { params }),
  getStats: () => api.get('/automation/stats'),
};
