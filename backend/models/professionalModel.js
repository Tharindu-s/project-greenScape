const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const professionalSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
});

// static signup method
professionalSchema.statics.signup = async function (
  email,
  password,
  name,
  city,
  country
) {
  // validation

  if (!email || !password || !name || !city || !country) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be at least 8 characters long and have at least one number, one lowercase and one uppercase letter and one special character"
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const professional = await this.create({
    email,
    password: hash,
    name,
    city,
    country,
  });

  return professional;
};

// static login method
professionalSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password required");
  }

  const professional = await this.findOne({ email });

  if (!professional) {
    throw Error("Invalid login credentials");
  }

  const match = await bcrypt.compare(password, professional.password);

  if (!match) {
    throw Error("Invalid login credentials");
  }

  return professional;
};

module.exports = mongoose.model("Professional", professionalSchema);
