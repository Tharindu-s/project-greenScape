const express = require("express");
const {
  createInquiry,
  getInquiry,
  getInquiriesByUser,
} = require("../controllers/inquiryController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// New inquiry
router.post("/", createInquiry);

// Get a single inquiry
router.get("/:id", getInquiry);

// Get all inquiries by user
router.get("/user/:recieverId", getInquiriesByUser);

module.exports = router;
