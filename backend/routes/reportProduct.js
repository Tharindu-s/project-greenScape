const express = require("express");
const {
  createReport,
  getReports,
  deleteReport,
} = require("../controllers/reportProductController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
// router.use(requireAuth);

// POST a new product
router.post("/", createReport);

// DELETE a product
router.delete("/:id", deleteReport);

// GET products by user
router.get("/", getReports);

module.exports = router;
