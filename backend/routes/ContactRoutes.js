const express = require("express");
const router = express.Router();
const { AdminContact } = require("../schema/adminmodel");

// GET all contacts
router.get("/contacts", async (_, res) => {
  try {
    const contacts = await AdminContact.find();
    res.json({ success: true, data: contacts });
  } catch {
    res.status(500).json({ success: false, msg: "Error fetching contacts" });
  }
});

// POST contact
// router.post("/contacts", async (req, res) => {
//   try {
//     const { contact_name, contact_phone, contact_email, contact_message } = req.body;

//     if (!contact_name || !contact_phone || !contact_email || !contact_message) {
//       return res.status(400).json({ success: false, msg: "All fields are required." });
//     }

//     const newContact = await AdminContact.create({
//       contact_name,
//       contact_phone,
//       contact_email,
//       contact_message
//     });

//     res.status(201).json({ success: true, data: newContact });

//   } catch (error) {
//     console.error("Error creating contact:", error);
//     res.status(500).json({ success: false, msg: "Error submitting contact" });
//   }
// });

// PUT contact
// router.put("/contacts/:id", async (req, res) => {
//   try {
//     const { contact_name, contact_phone, contact_email, contact_message } = req.body;
//     const update = { contact_name, contact_phone, contact_email, contact_message };

//     const updated = await AdminContact.findByIdAndUpdate(req.params.id, update, { new: true });
//     if (!updated) return res.status(404).json({ msg: "Contacts not found" });

//     res.json({ success: true, data: updated });
//   } catch {
//     res.status(500).json({ msg: "Update failed" });
//   }
// });

module.exports = router;