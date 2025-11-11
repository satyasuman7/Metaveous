const express = require("express");
const router = express.Router();

// Contact Controller imports
const { getAllContacts, createContact, updateContact } = require("../controllers/contactController.js");

// Contact Routes
router.get("/contacts", getAllContacts);
router.post("/contacts", createContact);
router.put("/contacts/:id", updateContact);

module.exports = router;