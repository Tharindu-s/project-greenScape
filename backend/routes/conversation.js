const express = require("express");
const {
  newConversaion,
  getConversasion,
  getFullConversaion,
} = require("../controllers/conversationsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes

// router.use(requireAuth);

// New conversation
router.post("/", newConversaion);

// Get conversation of a user
router.get("/:userId", getConversasion);

// Get conversation includes two userId
router.get("/find/:firstUserId/:secondUserId", getFullConversaion);

module.exports = router;
