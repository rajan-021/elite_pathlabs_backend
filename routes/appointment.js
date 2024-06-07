import express from "express";
import {fillAppointments, getAllAppointmentSlots} from "../controllers/appointmentController.js"

const router = express.Router();

router.post('/', fillAppointments);
router.get('/:id', getAllAppointmentSlots)



export default router