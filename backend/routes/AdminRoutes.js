const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { AdminAccount } = require("../schema/adminmodel.js");

// Multer Storage Configuration
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

// delete file from folder
const deleteFile = (filename) => {
  const filePath = path.join(__dirname, "..", uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Admin Signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, msg: "Email and password are required" });

    const user = await AdminAccount.findOne({ email });
    if (!user || user.password !== password) return res.status(401).json({ success: false, msg: "Invalid credentials" });

    jwt.sign({ id: user._id, email: user.email }, "Google", { expiresIn: "5d" }, (err, token) => {
      if (err) return res.status(500).json({ success: false, msg: "Error generating token" });
      res.json({ success: true, msg: "SignIn successful", name: user.fullname, token });
    });
  } catch (err) {
    console.error("SignIn error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// Get all Admin Accounts
router.get("/createaccount", async (req, res) => {
  try {
    const accounts = await AdminAccount.find();
    res.status(200).json({ success: true, data: accounts });
  } catch (err) {
    console.error("Error fetching accounts:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// Create Admin Account
router.post("/createaccount", upload.single("profile"), async (req, res) => {
  try {
    const { fullname, email, password, phoneno, status } = req.body;
    if (!fullname || !email || !password || !phoneno || !req.file) {
      return res.status(400).json({ success: false, msg: "All fields including profile image are required" });
    }

    const existingByName = await AdminAccount.findOne({ fullname });
    const existingByEmail = await AdminAccount.findOne({ email });

    if (existingByName && existingByEmail) return res.status(400).json({ msg: "Both name and email are already registered" });
    if (existingByName) return res.status(400).json({ msg: "Name is already registered" });
    if (existingByEmail) return res.status(400).json({ msg: "Email is already registered" });

    const newAdmin = new AdminAccount({
      fullname,
      email,
      password,
      phoneno,
      profile: req.file.filename,
      status: status === "true" || status === true,
    });

    await newAdmin.save();

    jwt.sign({ id: newAdmin._id, email }, "Google", { expiresIn: "5d" }, (err, token) => {
      if (err) return res.status(500).json({ success: false, msg: "Error generating token" });
      res.json({ success: true, msg: "Signup done", token, createdAt: newAdmin.createdAt });
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

// Delete Admin Account (and profile image)
router.delete("/createaccount/:id", async (req, res) => {
  try {
    const account = await AdminAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });

    if (account.profile) deleteFile(account.profile);

    await AdminAccount.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete account:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
});

// Update Admin Account
router.put("/createaccount/:id", upload.single("profile"), async (req, res) => {
  try {
    const { fullname, email, password, phoneno, status } = req.body;
    const updateFields = { fullname, email, password, phoneno, status: status === "true" || status === true };

    if (req.file) {
      // Delete old profile image first
      const oldAccount = await AdminAccount.findById(req.params.id);
      if (oldAccount?.profile) deleteFile(oldAccount.profile);

      updateFields.profile = req.file.filename;
    }

    const updatedAccount = await AdminAccount.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });
    if (!updatedAccount) return res.status(404).json({ message: "Account not found" });

    res.json(updatedAccount);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;