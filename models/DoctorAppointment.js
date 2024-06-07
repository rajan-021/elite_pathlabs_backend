import mongoose from "mongoose";
import { Types } from "mongoose";

const doctorAppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  selectedSlots: [
    {
      day: { type: String },
      slots: [String]
    }
  ],
});

export default mongoose.model("DoctorAppointment", doctorAppointmentSchema);
