const express = require("express");
const router = express.Router();

// Careers Controller imports
const { getAllCareers, createCareer, deleteCareer, updateCareer } = require("../controllers/careerController.js");

// Career Routes
router.get("/careers", getAllCareers);
router.post("/careers", createCareer);
router.delete("/careers/:id", deleteCareer);
router.put("/careers/:id", updateCareer);

module.exports = router;