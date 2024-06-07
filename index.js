import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import labRoute from "./routes/lab.js";

import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";
import appointmentsRoute from "./routes/appointment.js";
import emailRoute from "./routes/email.js";
import contactRoute from "./routes/contact.js";
import blogRoute from "./routes/blog.js";
import forgotPasswordRoute from "./routes/forgotpassword.js"
import resetPasswordRoute from "./routes/resetPassword.js";
import otherDoctorsRoute from "./routes/otherdoctors.js";
import appReviewRoute from "./routes/appReview.js";
import labappointmentsRoute from "./routes/labappointment.js";



import multer from "multer";
import path from "path"
import Report from "./models/Report.js";
import { fileURLToPath } from 'url';


// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("file name is ",__filename);
console.log("directory name is ",__dirname);


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello server");
});


// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};



app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/labs", labRoute);

app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/doctorappointments", appointmentsRoute);
app.use("/api/v1/labappointments", labappointmentsRoute);

app.use("/api/v1/sendemail", emailRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/forgotpassword", forgotPasswordRoute);
app.use("/api/v1/resetpassword", resetPasswordRoute);
app.use("/api/v1/otherdoctors", otherDoctorsRoute);
app.use("/api/v1/appreviews", appReviewRoute)




const upload = multer({ dest: 'uploads/' });
// Handle file uploads and store the file path in the database
app.post('/api/upload-report', upload.single('file'), async (req, res) => {
  try {
    const { userId } = req.body;
    const filePath = path.join(__dirname, 'uploads',req.file.filename);
    const report = new Report({
      userId,
      filePath,
    });

    await report.save();

    res.status(200).send('Report uploaded successfully');
  } catch (error) {
    console.error('Error uploading report:', error);
    res.status(500).send('An error occurred while uploading the report');
  }
});


// Route to handle file download
app.get('/api/download-report/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;
    console.log("Report id here", reportId);

    // Fetch the report from the database
    const report = await Report.find({userId:reportId});
    if (!report) {
      return res.status(404).send('Report not found');
    }

    console.log("report aa gaya",report);
    // Get the file path from the report
    const filePath = report[0].filePath;

    // Send the file to the client for download
    res.download(filePath, err => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('An error occurred while downloading the report');
      }
    });
  } catch (error) {
    console.error('Error retrieving report:', error);
    res.status(500).send('An error occurred while retrieving the report');
  }
});



app.listen(port, () => {
  connectDB();
  console.log("server listening on port " + port);
});
