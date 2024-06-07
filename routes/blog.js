import express, { Router } from "express";
import {
  uploadBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
} from "../controllers/blogContainer.js";
import { authenticate } from "../auth/verifyToken.js";
import { isAuthorized } from "../auth/isAuthorize.js";

const router = express.Router();

router.post("/", uploadBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", authenticate, isAuthorized, deleteBlog);

export default router;
