const express = require("express");
const {
  addRating,
  getRatingsByProfessional,
  getOverallRatingByProfessionalI,
} = require("../controllers/rateProfessionalController");

const router = express.Router();

// POST a new rating
router.post("/", addRating);

// GET ratings by seller
router.get("/:professionalId", getRatingsByProfessional);

// GET overall rating by seller
router.get("/overall/:professionalId", getOverallRatingByProfessionalI);

module.exports = router;
