// server/src/utils/validate.js
import Joi from "joi";

// User registration validation
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("customer", "provider").required(),
});

// Login validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Service creation validation
export const serviceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  durationMinutes: Joi.number().min(15).required(),
  price: Joi.number().min(0).required(),
});

// Availability slot validation
export const slotSchema = Joi.object({
  dayOfWeek: Joi.string()
    .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
    .required(),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(), // HH:mm
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
});

// Booking validation
export const bookingSchema = Joi.object({
  providerId: Joi.string().required(),
  serviceId: Joi.string().required(),
  slotId: Joi.string().required(),
  notes: Joi.string().allow(""),
});

// Review validation
export const reviewSchema = Joi.object({
  serviceId: Joi.string().required(),
  bookingId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow(""),
});
