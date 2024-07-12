const express = require("express");
const { createExchange } = require("../controllers/exchangeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes

// router.use(requireAuth);

// POST a new product
router.post("/", createExchange);

module.exports = router;
