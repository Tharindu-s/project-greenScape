const express = require("express");
const {
  addRating,
  getRatingsBySeller,
  getOverallRatingBySeller,
} = require("../controllers/rateSellerController");

const router = express.Router();

// POST a new rating
router.post("/", addRating);

// GET ratings by seller
router.get("/:sellerId", getRatingsBySeller);

// GET overall rating by seller
router.get("/overall/:sellerId", getOverallRatingBySeller);

module.exports = router;
