import express from "express";
import { authMiddleware,checkRole } from "../middlewares/auth.js";
import { createTour, deleteTour, getAllTours, getTourById, updateTour } from "../controllers/tourController.js";

const router = express.Router();

router.post("/add",createTour);

router.get("/",getAllTours);

router.put("/:id",updateTour);

router.delete("/:id",deleteTour);

router.get("/:id",getTourById);

export default router;