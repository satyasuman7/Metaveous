const mongoose = require("mongoose");

//CREATE ACCOUNT SCHEMA (ONLY ADMIN)
const accountSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneno: { type: Number, required: true },
  profile: { type: String, required: true },
  status: {type: Boolean, default: false}
}, { collection: "adminaccounts", timestamps: true });
accountSchema.index({ fullname: 1, email: 1 }, { unique: true });
const AdminAccount = mongoose.model("AdminAccount", accountSchema);

//ADD GALLERY SCHEMA
const addgallerySchema = new mongoose.Schema({
  gallery_title: { type: String, required: true },
  gallery_image: { type: String, required: true },
}, { collection: "adminsgallery", timestamps: true });
addgallerySchema.index({ gallery_title: 1 }, { unique: true });
const AdminGallery = mongoose.model("AdminGallery", addgallerySchema);

//ADD BLOGS SCHEMA
const addblogsSchema = new mongoose.Schema({
  blog_title: { type: String, required: true },
  blog_author_name: { type: String, required: true },
  blog_category: { type: String, required: true },
  blog_content: { type: String, required: true },
  blog_image: { type: String, required: true },
}, { collection: "adminblogs", timestamps: true });
const AdminBlogs = mongoose.model("AdminBlogs", addblogsSchema);

//ADD CAREER SCHEMA
const addcareerSchema = new mongoose.Schema({
  job_role: { type: String, required: true },
  job_experience: { type: String, required: true },
  job_vacancy: { type: Number, required: true },
  job_location: { type: String, required: true },
  job_type: { type: String, required: true },
  job_description: { type: String, required: true },
}, { collection: "admincareer", timestamps: true });
const AdminCareer = mongoose.model("AdminCareer", addcareerSchema);

//VIEW CONTACT SCHEMA
const addcontactSchema = new mongoose.Schema({
  contact_name: { type: String, required: true },
  contact_phone: { type: Number, required: true },
  contact_email: { type: String, required: true },
  contact_message: { type: String, required: true },
}, { collection: "admincontact", timestamps: true });
const AdminContact = mongoose.model("AdminContact", addcontactSchema);

module.exports = { AdminAccount, AdminGallery, AdminBlogs, AdminCareer, AdminContact };
