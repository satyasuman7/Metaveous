const mongoose = require("mongoose");

//CREATE ACCOUNT SCHEMA (ONLY ADMIN)
const accountSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneno: { type: Number, required: true },
  profile: { type: String, required: true },
  status: {type: Boolean, default: false}
}, { collection: "adminaccounts", timestamps: true });
accountSchema.index({ fullname: 1, email: 1 }, { unique: true });
const AdminAccount = mongoose.model("AdminAccount", accountSchema);

module.exports = AdminAccount;
