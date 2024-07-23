const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, name, city, country } = req.body;

  try {
    const user = await User.signup(email, password, name, city, country);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userId: user._id, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

//forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email does not exist" });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    // Read the HTML template
    const templatePath = path.join(
      __dirname,
      "Forgot password",
      "reset_password_template.html"
    );
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders in the template
    const resetLink = `http://localhost:3000/reset-password/${user._id}/${token}`;
    htmlTemplate = htmlTemplate.replace("{{resetLink}}", resetLink);

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // sender address
      to: user.email, // user email
      subject: "Reset your password",
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent");
        return res.json({ status: "success", message: "Email sent" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// reset password

const resetPasword = async (req, res) => {
  const user = User;
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.json({ error: "Expired or invalid token" });
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        user
          .findByIdAndUpdate({ _id: id }, { password: hash })
          .then((u) => res.send({ Status: "Password reset successful" }))
          .catch((err) => res.send({ Status: err }));
      });
    }
  });
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  updateUser,
  forgotPassword,
  resetPasword,
};
