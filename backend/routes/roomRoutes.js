import express from "express";
import { searchRooms } from "../controllers/roomController.js";

const router = express.Router();

// Search Rooms Route
router.get("/search", searchRooms);

export default router;
