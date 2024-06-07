import mongoose from "mongoose";

const labBookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Lab",
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
    },
    test: [
      {
        type: String
      }
    ]

  },
  { timestamps: true }
);

labBookingSchema.pre(/^find/, function (next) {
  this.populate("doctor")

  next();
});

export default mongoose.model("LabBooking", labBookingSchema);
