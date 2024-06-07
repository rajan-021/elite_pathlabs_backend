import express from "express";
import { authenticate, restrict } from "./../auth/verifyToken.js";
import { getCheckoutSession } from "../controllers/bookingController.js";
import{getLabCheckoutSession} from "../controllers/labBookingController.js";

const router = express.Router();

router.post(
  "/checkout-session/:doctorId",
  authenticate,
  restrict(["patient"]),
  getCheckoutSession
);

router.post(
  "/checkout-lab-session/:doctorId", //changes
  authenticate,
  restrict(["patient"]),
  getLabCheckoutSession
);

export default router;
