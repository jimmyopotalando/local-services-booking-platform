// client/src/services/reviewService.js
import api from "./api";

// Create a new review (customer only)
export const createReview = async (reviewData) => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};

// Get reviews for a specific service
export const getServiceReviews = async (serviceId) => {
  const response = await api.get(`/reviews/service/${serviceId}`);
  return response.data;
};

// Get reviews for a specific provider
export const getProviderReviews = async (providerId) => {
  const response = await api.get(`/reviews/provider/${providerId}`);
  return response.data;
};

// Update a review (customer only)
export const updateReview = async (reviewId, reviewData) => {
  const response = await api.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

// Delete a review (customer only)
export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};
