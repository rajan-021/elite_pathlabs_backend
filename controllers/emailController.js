import nodemailer from "nodemailer";
import DoctorSchema from "../models/DoctorSchema.js";
import { handleEmail } from "../utils/sendmail.js";
import LabsSchema from "../models/LabsSchema.js";

export const sendEmail = async (req, res) => {
  const { day, time } = req.body.bookedTime;
  try {
    const email = await DoctorSchema.find({ _id: req.body.doctorId }).select(
      "email"
    );

    const subject = "Booking Confirm";
    const text = `An Appointment is Booked With you on ${day.toUpperCase()} at ${time.toUpperCase()}`;

    const messageId = await handleEmail(email, subject, text);
    res.status(200).json({ message: "Appointment Booked", data: messageId });
  } catch (e) {
    console.log(e);
  }
};

export const sendLabEmail = async (req, res) => {
  const { day, time } = req.body.bookedTime;
  try {
    const email = await LabsSchema.find({ _id: req.body.doctorId }).select(
      "email"
    );

    const subject = "Booking Confirm";
    const text = `An Appointment is Booked With you on ${day.toUpperCase()} at ${time.toUpperCase()}`;

    const messageId = await handleEmail(email, subject, text);
    res.status(200).json({ message: "Appointment Booked", data: messageId });
  } catch (e) {
    console.log(e);
  }
};



