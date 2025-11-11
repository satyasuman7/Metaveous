const express = require("express");
const router = express.Router();

// Admin Controller imports
const { getProfile, signIn, getAllAccounts, createAccount, deleteAccount, updateAccount } = require("../controllers/adminController.js");

// Multer Storage 
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadDir = "uploads/";

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

// Admin Routes
router.get("/profile", getProfile);
router.post("/signin", signIn);
router.get("/createaccount", getAllAccounts);
router.post("/createaccount", upload.single("profile"), createAccount);
router.delete("/createaccount/:id", deleteAccount);
router.put("/createaccount/:id", upload.single("profile"), updateAccount);

module.exports = router;