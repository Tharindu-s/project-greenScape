const express = require("express");
const {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
  getProjectsByUser,
} = require("../controllers/projectController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
// router.use(requireAuth);

// GET all projects
router.get("/", getProjects);

// GET a project
router.get("/:id", getProject);

// POST a new project
router.post("/", createProject);

// DELETE a project
router.delete("/:id", deleteProject);

// UPDATE a project
router.patch("/:id", updateProject);

// GET projects by user
router.get("/user/:professionalId", getProjectsByUser);

module.exports = router;
