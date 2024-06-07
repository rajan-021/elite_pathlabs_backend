import mongoose from "mongoose";
import { Types } from "mongoose";

const labAppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: Types.ObjectId,
    ref: "Lab",
    required: true,
  },
  selectedSlots: [
    {
      day: { type: String },
      slots: [String]
    }
  ],
  test: [
    {
      type: String
    }
  ],
  price:{
    type:String
  }
});

export default mongoose.model("LabAppointment", labAppointmentSchema);
