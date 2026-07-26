// server/src/routes/serviceRoutes.js
import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getServices);
router.get("/:id", getServiceById);

// Private routes (Provider only)
router.post("/", protect, authorizeRoles("provider"), createService);
router.put("/:id", protect, authorizeRoles("provider"), updateService);
router.delete("/:id", protect, authorizeRoles("provider"), deleteService);

export default router;
