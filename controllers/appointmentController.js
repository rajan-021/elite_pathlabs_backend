import DoctorAppointment from "../models/DoctorAppointment.js";
import mongoose from "mongoose";
import LabAppointment from "../models/LabAppointment.js";

export const fillAppointments = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.doctorId);
    const appointmentsSlots = await DoctorAppointment.findOne({ doctorId: id });

    if (appointmentsSlots === null) {
      const booked = new DoctorAppointment({
        doctorId: req.body.doctorId,
        selectedSlots:{
          day:req.body.selectedSlots.day,
          slots:req.body.selectedSlots.time
        }
      });

      await booked.save();
      res.status(200).json("Slot booked successfully");
      return;
    }

    const response = await DoctorAppointment.findOneAndUpdate(
      {
        doctorId: req.body.doctorId,
        "selectedSlots.day": req.body.selectedSlots.day,
      },
      
      {
        $push: {
          "selectedSlots.$.slots": [req.body.selectedSlots.time]
        },
      }
    );


    if (response === null) {
      await DoctorAppointment.findOneAndUpdate(
        {
          doctorId: req.body.doctorId,
        },
        {
          $push: {
            selectedSlots: {
                day:req.body.selectedSlots.day,
                slots:[req.body.selectedSlots.time]
            },
          },
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
  res.status(200).json("Slot booked successfully");
};

export const getAllAppointmentSlots = async (req, res) => {
  const id = req.params.id;

  const appointmentsSlots = await DoctorAppointment.findOne({
    doctorId: id,
  }).select("selectedSlots");

  res.status(200).json({
    success: true,
    message: "Successfully fetched Slots",
    data: appointmentsSlots,
  });
};



export const getAllLabAppointmentSlots = async (req, res) => {
  const id = req.params.id;
  const appointmentsSlots = await LabAppointment.findOne({
    doctorId: id,
  }).select("selectedSlots");

  res.status(200).json({
    success: true,
    message: "Successfully fetched Slots",
    data: appointmentsSlots,
  });

};


export const fillLabAppointments = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.doctorId);
    const appointmentsSlots = await LabAppointment.findOne({ doctorId: id });

    if (appointmentsSlots === null) {
      const booked = new LabAppointment({
        doctorId: req.body.doctorId,
        selectedSlots:{
          day:req.body.selectedSlots.day,
          slots:req.body.selectedSlots.time
        },
        test:req.body.test,
        price:req.body.price

      });

      await booked.save();
      res.status(200).json("Slot booked successfully");
      return;
    }

    const response = await LabAppointment.findOneAndUpdate(
      {
        doctorId: req.body.doctorId,
        "selectedSlots.day": req.body.selectedSlots.day,
      },
      
      {
        $push: {
          "selectedSlots.$.slots": [req.body.selectedSlots.time]
        },
      }
    );


    if (response === null) {
      await LabAppointment.findOneAndUpdate(
        {
          doctorId: req.body.doctorId,
        },
        {
          $push: {
            selectedSlots: {
                day:req.body.selectedSlots.day,
                slots:[req.body.selectedSlots.time]
            },
          },
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
  res.status(200).json("Slot booked successfully");
};