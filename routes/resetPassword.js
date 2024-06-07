import express from "express";
import { resetPassword } from "../controllers/resetPasswordController.js";

const router = express.Router();

router.post('/:id/:token', resetPassword);
export default router