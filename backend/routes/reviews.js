const express = require("express");
const {
  createReview,
  getReviewsByProductId,
  getReviewCountByProductId,
} = require("../controllers/reviewController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes

// router.use(requireAuth);

//GET a single workout
// router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createReview);

// GET reviews by productId
router.get("/:productId", getReviewsByProductId);

// GET review count by productId
router.get("/count/:productId", getReviewCountByProductId);

module.exports = router;
