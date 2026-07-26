// client/src/services/authService.js
import api from "./api";

// Register a new user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
};

// Get current user profile
export const getProfile = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

// Update user profile
export const updateProfile = async (profileData) => {
  const response = await api.put("/users/me", profileData);
  return response.data;
};
