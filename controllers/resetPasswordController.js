import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const {userId} = jwt.verify(token, "jwt_secret_key");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const user = await User.findOne({ _id: userId });

      const doctor = await Doctor.findOne({ _id: userId });

      if (user) {
        await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword });
        res.status(200).json({ message: "Password Updted" });
      } else {
        await Doctor.findByIdAndUpdate(
          { _id: userId },
          { password: hashPassword }
        );
        res.status(200).json({ message: "Password Updted" });
      }
    } catch (e) {
      res.status(404).json({ message: "Invalid User" });
    }
  } catch (e) {
    res.status(404).json({ message: "Invalid Token" });
  }
};
