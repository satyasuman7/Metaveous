const mongoose = require("mongoose");

//ADD GALLERY SCHEMA
const addgallerySchema = new mongoose.Schema({
  gallery_title: { type: String, required: true },
  gallery_image: { type: String, required: true },
}, { collection: "adminsgallery", timestamps: true });
addgallerySchema.index({ gallery_title: 1 });
const AdminGallery = mongoose.model("AdminGallery", addgallerySchema);

module.exports = AdminGallery;