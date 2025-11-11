const AdminCareer = require("../schema/careermodel");

//GET all careers
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await AdminCareer.find();
    res.json({ success: true, data: careers });
  } catch {
    res.status(500).json({ success: false, msg: "Error fetching careers" });
  }
};

// POST career
exports.createCareer = async (req, res) => {
  try {
    const { job_role, job_experience, job_vacancy, job_location, job_type, job_description } = req.body;

    if (!job_role || !job_experience || !job_vacancy || !job_location || !job_type || !job_description) {
      return res.status(400).json({ success: false, msg: "All fields are required." });
    }

    const newCareer = await AdminCareer.create({ job_role, job_experience, job_vacancy, job_location, job_type, job_description });

    res.status(201).json({ success: true, data: newCareer });

  } catch (error) {
    console.error("Error creating career:", error);
    res.status(500).json({ success: false, msg: "Error submitting career" });
  }
};

//DELETE career
exports.deleteCareer = async (req, res) => {
  try {
    const career = await AdminCareer.findById(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });

    await AdminCareer.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete career" });
  }
};

// PUT career
exports.updateCareer = async (req, res) => {
  try {
    const { job_role, job_experience, job_vacancy, job_location, job_type, job_description } = req.body;
    const update = { job_role, job_experience, job_vacancy, job_location, job_type, job_description };

    const updated = await AdminCareer.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ msg: "Career not found" });

    res.json({ success: true, data: updated });
  } catch {
    res.status(500).json({ msg: "Update failed" });
  }
};