import express from "express";
import {fillLabAppointments, getAllLabAppointmentSlots} from "../controllers/appointmentController.js"

const router = express.Router();

router.post('/', fillLabAppointments);
router.get('/:id', getAllLabAppointmentSlots)



export default router