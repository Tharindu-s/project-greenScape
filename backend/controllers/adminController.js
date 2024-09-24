const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup an admin
const signupAdmin = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const admin = await Admin.signup(email, password, name);

    // create token
    const token = createToken(admin._id);

    res.status(200).json({ email, token, adminId: admin._id, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login a admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);

    // create token
    const token = createToken(admin._id);

    res.status(200).json({
      email,
      token,
      adminId: admin._id,
      name: admin.name,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginAdmin,
  signupAdmin,
};
