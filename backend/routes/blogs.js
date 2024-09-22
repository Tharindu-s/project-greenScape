const express = require("express");
const {
  getBlogs,
  getBlogsByUser,
  createBlog,
  deleteBlog,
  updateBlog,
  searchBlogs,
} = require("../controllers/blogController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
// router.use(requireAuth);

// GET all blogs
router.get("/", getBlogs);

// POST a new blog
router.post("/", createBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

// UPDATE a blog
router.patch("/:id", updateBlog);

// GET blogs by user
router.get("/user/:userId", getBlogsByUser);

//search blogs
router.get("/search/all", searchBlogs);

module.exports = router;
