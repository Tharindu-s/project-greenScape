const express = require("express");
const {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
  getProductsByUser,
  getProductsByProfessional,
  searchProducts,
  searchProductsById,
} = require("../controllers/productController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
// router.use(requireAuth);

// GET all products
router.get("/", getProducts);

//GET a single product
router.get("/:id", getProduct);

// POST a new product
router.post("/", createProduct);

// DELETE a product
router.delete("/:id", deleteProduct, requireAuth);

// UPDATE a product
router.patch("/:id", updateProduct, requireAuth);

// GET products by category
router.get("/category/:category", getProductsByCategory);

// GET products by user
router.get("/user/:userId", getProductsByUser);

// GET products by professional
router.get("/professional/:userId", getProductsByProfessional);

//search products
router.get("/search/all", searchProducts);

//search products by id
router.get("/search/:id", searchProductsById);

module.exports = router;
