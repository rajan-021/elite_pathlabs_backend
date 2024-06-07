import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },

    isPaid: {
      type: Boolean,
      default: true,
    },

    bookingTime:{
      type:Object,
    }
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate("doctor")

  next();
});

export default mongoose.model("Booking", bookingSchema);
