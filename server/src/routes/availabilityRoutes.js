// server/src/routes/availabilityRoutes.js
import express from "express";
import {
  createSlot,
  getProviderSlots,
  getMySlots,
  deleteSlot,
} from "../controllers/availabilityController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route: customers can view open slots for a provider
router.get("/provider/:providerId", getProviderSlots);

// Private routes (Provider only)
router.post("/", protect, authorizeRoles("provider"), createSlot);
router.get("/my-slots", protect, authorizeRoles("provider"), getMySlots);
router.delete("/:id", protect, authorizeRoles("provider"), deleteSlot);

export default router;
