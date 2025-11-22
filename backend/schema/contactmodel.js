const mongoose = require("mongoose");

//VIEW CONTACT SCHEMA
const addcontactSchema = new mongoose.Schema({
  contact_name: { type: String, required: true },
  contact_phone: { type: Number, required: true },
  contact_email: { type: String, required: true },
  contact_message: { type: String, required: true },
  status: {type: Boolean, default: false}
}, { collection: "admincontact", timestamps: true });
const AdminContact = mongoose.model("AdminContact", addcontactSchema);

module.exports = AdminContact;