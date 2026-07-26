// client/src/services/bookingService.js
import api from "./api";

// Create a new booking (customer only)
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

// Get current customer's bookings
export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");
  return response.data;
};

// Cancel a booking (customer only)
export const cancelBooking = async (bookingId) => {
  const response = await api.delete(`/bookings/${bookingId}`);
  return response.data;
};

// Get bookings for a provider (provider only)
export const getProviderBookings = async () => {
  const response = await api.get("/bookings/provider");
  return response.data;
};

// Update booking status (provider only)
export const updateBookingStatus = async (bookingId, status) => {
  const response = await api.put(`/bookings/${bookingId}/status`, { status });
  return response.data;
};
