// backend/routes/itineraryRoutes.js
import express from "express";
import { generateItinerary } from "../controllers/itineraryController.js";
import protect from "../middleware/authMiddleware.js"; // renamed to match actual export

const router = express.Router();

router.get("/generate", protect, generateItinerary);

export default router;
