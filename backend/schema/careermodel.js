const mongoose = require("mongoose");

//ADD CAREER SCHEMA
const addcareerSchema = new mongoose.Schema({
  job_role: { type: String, required: true },
  job_experience: { type: String, required: true },
  job_vacancy: { type: Number, required: true },
  job_location: { type: String, required: true },
  job_type: { type: String, required: true },
  job_description: { type: String, required: true },
}, { collection: "admincareer", timestamps: true });
const AdminCareer = mongoose.model("AdminCareer", addcareerSchema);

module.exports = AdminCareer;
