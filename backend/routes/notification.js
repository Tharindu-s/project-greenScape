const express = require("express");
const {
  getNotification,
  createNotifications,
} = require("../controllers/notifcationsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// New inquiry
router.post("/", createNotifications);

// Get a single inquiry
router.get("/", getNotification);

module.exports = router;
