import express from "express";
import { otherDoctors } from "../controllers/otherDoctorsController.js";

const router = express.Router();

router.get('/:id', otherDoctors);
export default router