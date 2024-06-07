import AppReview from "../models/AppReviewSchema.js";

export const postReview = async (req, res) => {
  const { name, message } = req.body;
  try {
    const result = new AppReview({
      name,
      message,
    });

    await result.save();
    res.status(200).json({
      success: true,
      message: "review submitted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const reviews = await AppReview.find({}).limit(4);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
