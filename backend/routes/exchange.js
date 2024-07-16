const express = require("express");
const {
  createExchange,
  getExchangesByUser,
  updateRequest,
} = require("../controllers/exchangeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes

// router.use(requireAuth);

// POST a new product
router.post("/", createExchange);

// GET all exchanges by user
router.get("/user/:recieverId", getExchangesByUser);

// PUT update an exchange request
router.patch("/:id", updateRequest);

module.exports = router;
