  import {getAllLabs, getSingleLab} from "../controllers/doctorController.js";
  import express from "express";
  // import { createReview } from "../controllers/reviewController.js";
  import reviewRouter from "../routes/review.js";
  
  const router = express.Router();
  
  router.use("/:doctorId/reviews", reviewRouter);
  
  // get all labs
  router.get("/", getAllLabs);
  router.get("/:id", getSingleLab);

  export default router;
  