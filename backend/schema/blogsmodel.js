const mongoose = require("mongoose");

//ADD BLOGS SCHEMA
const addblogsSchema = new mongoose.Schema({
  blog_title: { type: String, required: true },
  blog_author_name: { type: String, required: true },
  blog_category: { type: String, required: true },
  blog_content: { type: String, required: true },
  blog_image: { type: String, required: true },
}, { collection: "adminblogs", timestamps: true });
const AdminBlogs = mongoose.model("AdminBlogs", addblogsSchema);

module.exports = AdminBlogs;