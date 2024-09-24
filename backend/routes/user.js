const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  getUser,
  getUsers,
  updateUser,
  forgotPassword,
  resetPasword,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

//GET a single product
router.get("/:id", getUser);

//GET all users
router.get("/", getUsers);

// UPDATE a user
router.patch("/:id", updateUser);

// DELETE a user
router.delete("/:id", deleteUser);

//Forgot password
router.post("/forgotPassword", forgotPassword);

//Reset password
router.post("/resetPassword/:id/:token", resetPasword);

module.exports = router;
