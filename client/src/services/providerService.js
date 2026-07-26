// client/src/services/providerService.js
import api from "./api";

// Get provider profile by ID
export const getProviderProfile = async (providerId) => {
  const response = await api.get(`/users/${providerId}`);
  return response.data;
};

// Update provider profile (provider only)
export const updateProviderProfile = async (profileData) => {
  const response = await api.put("/users/me", profileData);
  return response.data;
};

// Create a new service (provider only)
export const createService = async (serviceData) => {
  const response = await api.post("/services", serviceData);
  return response.data;
};

// Get all services for a provider
export const getProviderServices = async (providerId) => {
  const response = await api.get(`/services/provider/${providerId}`);
  return response.data;
};

// ✅ NEW: Get a single service by ID
export const getServiceById = async (serviceId) => {
  const response = await api.get(`/services/${serviceId}`);
  return response.data;
};

// Update a service (provider only)
export const updateService = async (serviceId, serviceData) => {
  const response = await api.put(`/services/${serviceId}`, serviceData);
  return response.data;
};

// Delete a service (provider only)
export const deleteService = async (serviceId) => {
  const response = await api.delete(`/services/${serviceId}`);
  return response.data;
};

// Create availability slot (provider only)
export const createAvailabilitySlot = async (slotData) => {
  const response = await api.post("/availability", slotData);
  return response.data;
};

// Get provider availability slots
export const getProviderAvailability = async (providerId) => {
  const response = await api.get(`/availability/provider/${providerId}`);
  return response.data;
};

// Delete availability slot (provider only)
export const deleteAvailabilitySlot = async (slotId) => {
  const response = await api.delete(`/availability/${slotId}`);
  return response.data;
};
