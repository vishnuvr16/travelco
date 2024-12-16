// routes/authRoutes.js
import express from "express";
import { register,login, logout, getallCustomers } from "../controllers/authController.js";
import { authMiddleware,checkRole } from "../middlewares/auth.js";

const router = express.Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);

router.post('/logout',logout)

router.get("/customers", getallCustomers)


export default router;