import Blog from "../models/BlogSchema.js";
import mongoose from "mongoose";

export const isAuthorized = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog.doctorId.equals(req.userId)) {
    return res.status(403).json({
      message: "You are not authorized to Delete",
    });
  }
  next();
};


