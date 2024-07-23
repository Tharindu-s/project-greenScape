const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  getUser,
  updateUser,
  forgotPassword,
  resetPasword,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

//GET a single product
router.get("/:id", getUser);

// UPDATE a user
router.patch("/:id", updateUser);

//Forgot password
router.post("/forgotPassword", forgotPassword);

//Reset password
router.post("/resetPassword/:id/:token", resetPasword);

module.exports = router;
