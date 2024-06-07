import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import { handleEmail } from "../utils/sendmail.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    const doctor = await Doctor.findOne({ email });

    if (user || doctor) {
      const token = jwt.sign(
        { userId: user?._id || doctor?._id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      const subject = "Reset your Password";
      const text = `http://localhost:3000/resetpassword/${
        user?._id || doctor?._id
      }/${token}
      `;

 
      await handleEmail(email, subject,text);

      return res
        .status(200)
        .json({ message: "Password reset instructions sent to your email." });
    } else {
      return res
        .status(404)
        .json({ message: "User  with this email does not exist." });
    }
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


