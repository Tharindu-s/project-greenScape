const express = require("express");
const {
  getService,
  getServices,
  getServicesByCategory,
  getServicesByProfessional,
  createService,
  deleteService,
  updateService,
  searchService,
} = require("../controllers/serviceController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
// router.use(requireAuth);

// GET all services
router.get("/", getServices);

//GET a single service
router.get("/:id", getService);

// POST a new service
router.post("/", createService);

// DELETE a service
router.delete("/:id", deleteService, requireAuth);

// UPDATE a service
router.patch("/:id", updateService, requireAuth);

// GET services by category
router.get("/category/:category", getServicesByCategory);

// GET services by professional
router.get("/professional/:userId", getServicesByProfessional);

//search services
router.get("/search/all", searchService);

module.exports = router;
