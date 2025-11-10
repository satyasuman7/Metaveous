const express = require("express");
const router = express.Router();
const AdminGallery = require("../schema/gallerymodel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Directory for uploads
const uploadDir = "uploads/gallery/";

// Multer setup
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

// delete file from folder
const deleteFile = (filename) => {
  const filePath = path.join(__dirname, "..", uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// POST gallery item
router.post("/gallery", upload.single("gallery_image"), async (req, res) => {
  try {
    const { gallery_title } = req.body;
    if (!gallery_title || !req.file) {
      return res.status(400).json({ success: false, msg: "Title and image are required" });
    }

    const existing = await AdminGallery.findOne({ gallery_title });
    if (existing) {
      return res.status(400).json({ success: false, msg: "Title already exists" });
    }

    const newGallery = new AdminGallery({
      gallery_title,
      gallery_image: req.file.filename,
    });

    await newGallery.save();
    res.json({ success: true, data: newGallery });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, msg: "Error submitting gallery" });
  }
});

// GET gallery items
router.get("/gallery", async (req, res) => {
  try {
    const gallery = await AdminGallery.find();
    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, msg: "Error submitting gallery" });
  }
});

// DELETE gallery item
router.delete("/gallery/:id", async (req, res) => {
  try {
    const gallery = await AdminGallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Gallery item not found" });

    if (gallery.gallery_image) deleteFile(gallery.gallery_image);

    await AdminGallery.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete gallery:", error);
    res.status(500).json({ message: "Failed to delete gallery" });
  }
});

// Update Gallery Item
router.put("/gallery/:id", upload.single("gallery_image"), async (req, res) => {
  try {
    const { gallery_title } = req.body;
    const updateFields = { gallery_title };

    if (req.file) {
      // Delete old gallery image first
      const oldGallery = await AdminGallery.findById(req.params.id);
      if (oldGallery?.gallery_image) deleteFile(oldGallery.gallery_image);
      updateFields.gallery_image = req.file.filename;
    }

    const updatedGallery = await AdminGallery.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    if (!updatedGallery) return res.status(404).json({ message: "Gallery item not found" });

    res.json(updatedGallery);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
