const AdminGallery = require("../schema/gallerymodel");
const path = require("path");
const fs = require("fs");
const uploadDir = "uploads/gallery/";

// delete file from folder
const deleteFile = (filename) => {
  const filePath = path.join(__dirname, "..", uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

//GET all gallery
exports.getAllGallery = async (req, res) => {
  try {
    const gallery = await AdminGallery.find();
    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    console.error("Error fetching gallery:", err);
    res.status(500).json({ success: false, msg: "Error fetching gallery" });
  }
};

// POST gallery
exports.createGallery = async (req, res) => {
  try {
    const { gallery_title } = req.body;
    if (!gallery_title || !req.file) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
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
};

// DELETE gallery
exports.deleteGallery = async (req, res) => {
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
};

// PUT gallery
exports.updateGallery = async (req, res) => {
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
    if (!updatedGallery) return res.status(404).json({ msg: "Gallery item not found" });
    res.json(updatedGallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};