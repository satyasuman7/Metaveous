const AdminBlogs = require("../schema/blogsmodel.js");
const path = require("path");
const fs = require("fs");
const uploadDir = "uploads/blogs/";

// delete file from folder
const deleteFile = (filename) => {
  const filePath = path.join(__dirname, "..", uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// GET all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await AdminBlogs.find();
    res.json({ success: true, data: blogs });
  } catch {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ success: false, msg: "Error fetching blogs" });
  }
};

// POST blog
exports.createBlog = async (req, res) => {
  try {
    const { blog_title, blog_author_name, blog_category, blog_content } = req.body;

    if (!blog_title || !blog_author_name || !blog_category || !blog_content || !req.file) {
      return res.status(400).json({ success: false, msg: "All fields and an image are required." });
    }

    const newBlog = await AdminBlogs.create({
      blog_title,
      blog_author_name,
      blog_category,
      blog_content,
      blog_image: req.file.filename
    });

    res.status(201).json({ success: true, data: newBlog });

  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ success: false, msg: "Error submitting blog" });
  }
};

// DELETE blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await AdminBlogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    else if (blog.blog_image) {
      deleteFile(blog.blog_image);
    }
    await AdminBlogs.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete blog:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

//PUT blog
exports.updateBlog = async (req, res) => {
  try {
    const { blog_title, blog_author_name, blog_category, blog_content } = req.body;
    const update = { blog_title, blog_author_name, blog_category, blog_content };

    if (req.file) {
      const old = await AdminBlogs.findById(req.params.id);
      if (old?.blog_image) deleteFile(old.blog_image);
      update.blog_image = req.file.filename;
    }

    const updatedBlogs = await AdminBlogs.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updatedBlogs) return res.status(404).json({ msg: "Blog not found" });

    res.json({ success: true, data: updatedBlogs });
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
};