import express from "express";
import { searchRooms } from "../controllers/roomController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Search Rooms Route
router.get("/search", authMiddleware, searchRooms);

export default router;
