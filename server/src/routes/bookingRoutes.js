// server/src/routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/", protect, authorizeRoles("customer"), createBooking);
router.get("/my-bookings", protect, authorizeRoles("customer"), getMyBookings);
router.delete("/:id", protect, authorizeRoles("customer"), cancelBooking);

// Provider routes
router.get("/provider", protect, authorizeRoles("provider"), getProviderBookings);
router.put("/:id/status", protect, authorizeRoles("provider"), updateBookingStatus);

export default router;
