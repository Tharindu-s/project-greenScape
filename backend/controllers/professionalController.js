const Professional = require("../models/professionalModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a professional
const loginProfessional = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professional = await Professional.login(email, password);

    // create token
    const token = createToken(professional._id);

    res.status(200).json({
      email,
      token,
      professionalId: professional._id,
      name: professional.name,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a professional
const signupProfessional = async (req, res) => {
  const { email, password, name, city, country } = req.body;

  try {
    const professional = await Professional.signup(
      email,
      password,
      name,
      city,
      country
    );

    // create token
    const token = createToken(professional._id);

    res
      .status(200)
      .json({ email, token, professionalId: professional._id, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single professional
const getProfessional = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Professional not found" });
  }

  try {
    const professional = await Professional.findById(id);

    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// update a professional
const updateProfessional = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such professional" });
  }

  const professional = await Professional.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!professional) {
    return res.status(400).json({ error: "No such professional" });
  }

  res.status(200).json(professional);
};

module.exports = {
  signupProfessional,
  loginProfessional,
  getProfessional,
  updateProfessional,
};
