// server/src/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private route (requires JWT)
router.post("/logout", protect, logoutUser);

export default router;
