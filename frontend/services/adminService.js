import api from './api';

// Get dashboard statistics
export const getDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// Get all orders (admin)
export const getAdminOrders = async (params = {}) => {
  const response = await api.get('/admin/orders', { params });
  return response.data;
};

// Alias for getAllOrders
export const getAllOrders = getAdminOrders;

// Update order status
export const updateOrderStatus = async (id, statusData) => {
  const response = await api.put(`/admin/orders/${id}`, statusData);
  return response.data;
};

// Get all users (admin)
export const getAdminUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

// Alias for getAllUsers
export const getAllUsers = getAdminUsers;

// Update user role
export const updateUserRole = async (id, role) => {
  const response = await api.put(`/admin/users/${id}/role`, { role });
  return response.data;
};

// Get all reviews (admin)
export const getAdminReviews = async (params = {}) => {
  const response = await api.get('/admin/reviews', { params });
  return response.data;
};

// Alias for getAllReviews
export const getAllReviews = getAdminReviews;

// Approve/reject review
export const approveReview = async (id, isApproved) => {
  const response = await api.put(`/admin/reviews/${id}/approve`, { isApproved });
  return response.data;
};

// Get analytics
export const getAnalytics = async (params = {}) => {
  const response = await api.get('/admin/analytics', { params });
  return response.data;
};
