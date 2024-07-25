const express = require("express");
const {
  sendMessage,
  getMessage,
} = require("../controllers/messagesController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes

// router.use(requireAuth);

// POST message
router.post("/", sendMessage);

// GET message
router.get("/:conversationId", getMessage);

module.exports = router;
