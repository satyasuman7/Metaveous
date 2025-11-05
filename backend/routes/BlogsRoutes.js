const express = require("express");
const router = express.Router();
const { AdminBlogs } = require("../schema/adminmodel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload directory
const uploadDir = "uploads/blogs/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer config
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
});
const upload = multer({
  storage,
  fileFilter: (_, file, cb) => cb(file.mimetype.startsWith("image/") ? null : new Error("Only images allowed"), file.mimetype.startsWith("image/"))
});

// Delete image file
const deleteFile = (filename) => {
  const filePath = path.join(__dirname, "..", uploadDir, filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// GET all blogs
router.get("/blogs", async (_, res) => {
  try {
    const blogs = await AdminBlogs.find();
    res.json({ success: true, data: blogs });
  } catch {
    res.status(500).json({ success: false, msg: "Error fetching blogs" });
  }
});

// POST blog
router.post("/blogs", upload.single("blog_image"), async (req, res) => {
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
});

// DELETE blog
router.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await AdminBlogs.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.blog_image) deleteFile(blog.blog_image);

    await AdminBlogs.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete blog:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});


// PUT blog
router.put("/blogs/:id", upload.single("blog_image"), async (req, res) => {
  try {
    const { blog_title, blog_author_name, blog_category, blog_content } = req.body;
    const update = { blog_title, blog_author_name, blog_category, blog_content };

    if (req.file) {
      const old = await AdminBlogs.findById(req.params.id);
      if (old?.blog_image) deleteFile(old.blog_image);
      update.blog_image = req.file.filename;
    }

    const updated = await AdminBlogs.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ msg: "Blog not found" });

    res.json({ success: true, data: updated });
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
});

module.exports = router;
