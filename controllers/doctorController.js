import Booking from "../models/BookingSchema.js";
import LabBookingSchema from "../models/LabBookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
// import LabsSchema from "../models/LabsSchema.js";
import Lab from "../models/LabsSchema.js";
// import LabAppointment from "../models/LabAppointment.js";


// update Doctor
export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};


// update Lab
export const updateLab = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedDoctor = await Lab.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};


// delete Doctor
export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// getSingle Doctor
export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: doctor,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// getAll Doctor
export const getAllDoctor = async (req, res) => {
  console.log("Entering getAllDoctor function");

  try {
    const { query } = req.query;
    console.log(query);
    let doctors;

    if (query) {
      // Search based on doctor name or specialization
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the name field
          { specialization: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the specialization field
        ],
      }).select("-password");
    } else {
      // Get all approved doctors
      doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
    }
    // console.log(doctors);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: doctors,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Doctor Not found",
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const userId = req.userId;


  try {
    // let user = null;
    const user = await Doctor.findById(userId);


    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const appointments = await Booking.find({ doctor: userId }).populate('user');

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully ",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong! cannot get!" });
  }
};


export const getAdminProfile = async (req, res) => {
  const userId = req.userId;

  try {
    // let user = null;
    const user = await Lab.findById(userId);
    console.log("printing user ", user);
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const appointments = await LabBookingSchema.find({ doctor: userId }).populate('user');
    console.log("Printing appointments", appointments);

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully ",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong! cannot get!" });
  }
};









//Lab controller also listed here


//get all labs
export const getAllLabs = async (req, res) => {
  try {
    const { query } = req.query;
    // console.log(query);
    let labs;

    if (query) {
      // Search based on lab name or locations
      labs = await Lab.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the name field
          { location: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the specialization field
        ],
      }).select("-password");
    } else {
      // Get all labs
      labs = await Lab.find().select("-password");
    }
    res.status(200).json({
      success: true,
      message: "Successful",
      data: labs,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Lab Not found",
    });
  }
};



// getSingle Lab
export const getSingleLab = async (req, res) => {
  const id = req.params.id;
  console.log("single lab id:", id);

  try {
    const lab = await Lab.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: lab,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Lab Not found",
    });
  }
};