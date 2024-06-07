import Blog from "../models/BlogSchema.js";

export const uploadBlog = async (req, res) => {
  try {
    const { title, content, doctorId, image, summary } = req.body;
    const blog = new Blog({
      title,
      content,
      doctorId,
      image,
      summary,
    });

    const savedBlog = await blog.save();
    res.status(200).json({
      message: "Posted Blog successfully!",
    });
  } catch (error) {
    res.status(404).json({ error: "Failed to create a blog post" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("doctorId"); // Populate author field with user details
    res.json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("doctorId");
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the blog post" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted Successfully!",
    });
  } catch (e) {
    res.status(404).json(e.message);
  }
};
