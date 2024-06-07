import Doctor from "../models/DoctorSchema.js";
export const otherDoctors = async (req, res) => {
  const { id } = req.params;
  try {
    const doctors = await Doctor.find({ _id: { $ne: id } }).select(
      "name email photo averageRating specialization bio"
    );

    res.status(200).json({
      message: "fetched successfully !",
      data: doctors,
    });
  } catch (e) { 
    res.status(404).json({ message: e.message });
  }
};
