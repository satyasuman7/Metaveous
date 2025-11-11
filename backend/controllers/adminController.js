const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const AdminAccount = require("../schema/adminmodel.js");
const uploadDir = "uploads/";

// delete file from folder
const deleteFile = (filename) => {
  const filePath = path.join(__dirname, "..", uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Get Logged-in Admin Profile
exports.getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, "Google", async (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, msg: "Invalid or expired token" });
      }

      const user = await AdminAccount.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }

      res.status(200).json({
        success: true,
        name: user.fullname,
        image: user.profile,
        email: user.email,
        phoneno: user.phoneno,
      });
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Admin Signin
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, msg: "Email and password are required" });

    const user = await AdminAccount.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    if (user.status === false) {
      return res.status(403).json({ success: false, msg: "Account is Inactive. Contact admin." });
    }

    jwt.sign({ id: user._id, email: user.email }, "Google", { expiresIn: "8h" }, (err, token) => {
      if (err) {
        console.error("Token generation error:", err);
        return res.status(500).json({ success: false, msg: "Error generating token" });
      }
      res.json({success: true, msg: "SignIn successful", name: user.fullname, token, image: user.profile });
    });
  } catch (err) {
    console.error("SignIn error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Get all Admin Accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await AdminAccount.find();
    res.status(200).json({ success: true, data: accounts });
  } catch (err) {
    console.error("Error fetching accounts:", err);
    res.status(500).json({ success: false, msg: "Error fetching accounts" });
  }
};

// Create Admin Account
exports.createAccount = async (req, res) => {
  try {
    const { fullname, email, password, phoneno, status } = req.body;

    if (!fullname || !email || !password || !phoneno || !req.file) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    const existingByName = await AdminAccount.findOne({ fullname });
    const existingByEmail = await AdminAccount.findOne({ email });

    // if (existingByName && existingByEmail) {
    //   deleteFile(req.file.filename);
    //   return res.status(400).json({ msg: "Both name and email are already registered" });
    // }
    // if (existingByName) {
    //   deleteFile(req.file.filename);
    //   return res.status(400).json({ msg: "Name is already registered" });
    // }
    // if (existingByEmail) {
    //   deleteFile(req.file.filename);
    //   return res.status(400).json({ msg: "Email is already registered" });
    // }

    if (existingByName || existingByEmail) {
      deleteFile(req.file.filename);
      return res.status(400).json({
        msg: existingByName && existingByEmail ? "Both name and email are already registered"
            : existingByName ? "Name is already registered"
            : "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminAccount({ fullname, email, password: hashedPassword, phoneno, profile: req.file.filename, status: status === "true" });

    await newAdmin.save();

    jwt.sign({ id: newAdmin._id, email }, "Google", { expiresIn: "8h" }, (err, token) => {
        if (err) {
          console.error("JWT error:", err);
          return res.status(500).json({ success: false, msg: "Error generating token" });
        }
        res.json({ success: true, msg: "Account Created Successfully", token, createdAt: newAdmin.createdAt });
      }
    );
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Delete Admin Account (and profile image)
exports.deleteAccount = async (req, res) => {
  try {
    const account = await AdminAccount.findById(req.params.id);
    if (!account) { 
      return res.status(404).json({ message: "Account not found" });
    }
    else if (account.profile) {
      deleteFile(account.profile);
    }
    await AdminAccount.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete account:", error);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

// Update Admin Account
exports.updateAccount = async (req, res) => {
  try {
    const { fullname, email, password, phoneno, status } = req.body;
    const existingAccount = await AdminAccount.findById(req.params.id);
    if (!existingAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    const updateFields = { fullname, email, phoneno, status: status === "true" || status === true };

    // convert password to hashed password if provided
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    } else {
      updateFields.password = existingAccount.password;
    }

    if (req.file) {
      if (existingAccount.profile) deleteFile(existingAccount.profile);
      updateFields.profile = req.file.filename;
    }

    const updatedAccount = await AdminAccount.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json({ success: true, msg: "Account updated successfully", data: updatedAccount });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};