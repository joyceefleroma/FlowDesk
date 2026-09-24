import api from './api';

export const workflowService = {
  getWorkflows: (params = {}) => api.get('/workflows', { params }),
  getWorkflowById: (id) => api.get(`/workflows/${id}`),
  createWorkflow: (payload) => api.post('/workflows', payload),
  updateWorkflow: (id, payload) => api.put(`/workflows/${id}`, payload),
  toggleWorkflow: (id, isActive) => api.patch(`/workflows/${id}/toggle`, { isActive }),
  deleteWorkflow: (id) => api.delete(`/workflows/${id}`),
  testWorkflow: (id, taskId) => api.post(`/workflows/${id}/test`, { taskId }),
};
