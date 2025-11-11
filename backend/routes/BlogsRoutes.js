const express = require("express");
const router = express.Router();

//Blogs Controller imports
const { getAllBlogs, createBlog, deleteBlog, updateBlog } = require("../controllers/blogsController.js");

// Multer Storage 
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = "uploads/blogs/";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const fileFilter = (req, file, cb) => {
  cb(file.mimetype.startsWith("image/") ? null : new Error("Only image files are allowed"), file.mimetype.startsWith("image/"));
};
const upload = multer({ storage, fileFilter });

//Blogs Routes
router.get("/blogs", getAllBlogs);
router.post("/blogs", upload.single("blog_image"), createBlog);
router.delete("/blogs/:id", deleteBlog);
router.put("/blogs/:id", upload.single("blog_image"), updateBlog);

module.exports = router;