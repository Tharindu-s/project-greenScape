const express = require("express");
const { createTest } = require("../controllers/testController");

const router = express.Router();

// POST a new product
router.post("/", createTest);

module.exports = router;
