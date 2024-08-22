const express = require("express");
const {
  createCartItem,
  getItemsByUser,
  deleteCartItem,
} = require("../controllers/cartController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
// router.use(requireAuth);

// POST a new product
router.post("/", createCartItem);

// DELETE a product
router.delete("/:id", deleteCartItem, requireAuth);

// GET products by user
router.get("/user/:userId", getItemsByUser);

module.exports = router;
