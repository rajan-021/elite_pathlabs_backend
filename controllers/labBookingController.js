import LabBooking from "../models/LabBookingSchema.js";
import Lab from "../models/LabsSchema.js";
import Stripe from "stripe";
import User from "../models/UserSchema.js";
import LabAppointment from "../models/LabAppointment.js";


export const getLabCheckoutSession = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // get the currently booked doctor
    const doctor = await Lab.findById(req.params.doctorId);
    const user = await User.findById(req.userId);
    const labAppointments = await LabAppointment.find({ doctorId: doctor });

    // create checkout session
    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctor/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: Math.ceil(doctor.ticketPrice / 2),
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });




    // Create a booking object with the necessary details
    const booking = new LabBooking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: labAppointments.length > 0 ? labAppointments[0].price : null,
      session: session.id,
      bookingTime: req.body,
      test:labAppointments.length > 0 ? labAppointments[0].test : null,

    });
    console.log(session.id);
    // Save the booking object to the database
    await booking.save();

    // send the created session as a response
    res.status(200).json({ success: true, message: "Success", session });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};

