const express = require("express");
const router = express.Router();

// Gallery Controller imports
const { getAllGallery, createGallery, deleteGallery, updateGallery } = require("../controllers/galleryController.js");

// Multer Storage 
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = "uploads/gallery/";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
  },
});
const fileFilter = (req, file, cb) => {
  cb(file.mimetype.startsWith("image/") ? null : new Error("Only image files are allowed"), file.mimetype.startsWith("image/"));
};
const upload = multer({ storage, fileFilter });

//Gallery Routes
router.get("/gallery", getAllGallery);
router.post("/gallery", upload.single("gallery_image"), createGallery);
router.delete("/gallery/:id", deleteGallery);
router.put("/gallery/:id", upload.single("gallery_image"), updateGallery);

module.exports = router;