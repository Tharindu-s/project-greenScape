const express = require("express");
const {
  createExchange,
  getRecievedExchangesByUser,
  getSentExchangesByUser,
  updateRequest,
} = require("../controllers/exchangeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes

// router.use(requireAuth);

// POST a new product
router.post("/", createExchange);

// GET reveieved exchanges by user
router.get("/user/recieved/:recieverId", getRecievedExchangesByUser);

// GET sent exchanges by user
router.get("/user/sent/:senderId", getSentExchangesByUser);

// PUT update an exchange request
router.patch("/:id", updateRequest);

module.exports = router;
