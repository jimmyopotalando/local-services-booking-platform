// server/src/routes/reviewRoutes.js
import express from "express";
import {
  createReview,
  getServiceReviews,
  getProviderReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/service/:serviceId", getServiceReviews);
router.get("/provider/:providerId", getProviderReviews);

// Private routes (Customer only)
router.post("/", protect, authorizeRoles("customer"), createReview);
router.put("/:id", protect, authorizeRoles("customer"), updateReview);
router.delete("/:id", protect, authorizeRoles("customer"), deleteReview);

export default router;
