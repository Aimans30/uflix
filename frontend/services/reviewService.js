import api from './api';

// Create product review
export const createReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

// Update review
export const updateReview = async (id, reviewData) => {
  const response = await api.put(`/reviews/${id}`, reviewData);
  return response.data;
};

// Delete review
export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

// Mark review as helpful
export const markReviewHelpful = async (id) => {
  const response = await api.put(`/reviews/${id}/helpful`);
  return response.data;
};
