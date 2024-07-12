const express = require("express");

// controller functions
const {
  signupProfessional,
  loginProfessional,
  getProfessional,
  updateProfessional,
} = require("../controllers/professionalController");

const router = express.Router();

// login route
router.post("/login", loginProfessional);

// signup route
router.post("/signup", signupProfessional);

//GET a single product
router.get("/:id", updateProfessional);

// UPDATE a user
router.patch("/:id", updateProfessional);

module.exports = router;
