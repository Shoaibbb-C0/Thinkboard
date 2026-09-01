import express from "express";

import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";

import {
  protectRoute,
} from "../middleware/authMiddleware.js";

import authRateLimiter from "../middleware/authRateLimiter.js";

const router = express.Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);

router.post("/logout", logout);
router.get("/me", protectRoute, getCurrentUser);

export default router;