import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model("Contact", contactSchema);
