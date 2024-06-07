import express from "express"
import { sendEmail,sendLabEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/", sendEmail);

router.post("/sendlabemail", sendLabEmail);


export default router
 