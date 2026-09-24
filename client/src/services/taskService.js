import api from './api';

export const taskService = {
  getTasks: (params = {}) => api.get('/tasks', { params }),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  createTask: (payload) => api.post('/tasks', payload),
  updateTask: (id, payload) => api.put(`/tasks/${id}`, payload),
  updateStatus: (id, status) => api.patch(`/tasks/${id}/status`, { status }),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  addSubtask: (taskId, title) => api.post(`/tasks/${taskId}/subtasks`, { title }),
  toggleSubtask: (taskId, subtaskId, isCompleted) => api.patch(`/tasks/${taskId}/subtasks/${subtaskId}`, { isCompleted }),
  deleteSubtask: (taskId, subtaskId) => api.delete(`/tasks/${taskId}/subtasks/${subtaskId}`),
};
