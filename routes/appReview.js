import { postReview, getReview } from "../controllers/appReviewController.js";
import express from "express";

const router = express.Router();

// get all users
router.get("/", getReview);
router.post("/", postReview);

export default router;
