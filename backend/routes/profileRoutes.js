import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile
} from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProfile);
router.get("/:userId", authMiddleware, getProfile);
router.put("/:userId", authMiddleware, updateProfile);


export default router;
