const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
});

// static signup method
adminSchema.statics.signup = async function (email, password, name) {
  // validation

  if (!email || !password || !name) {
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

  const admin = await this.create({
    email,
    password,
    name,
  });

  return admin;
};

// static login method
adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password required");
  }

  const admin = await this.findOne({ email });

  if (!admin) {
    throw Error("Invalid login credentials");
  }

  if (admin.password !== password) {
    throw Error("Invalid login credentials");
  }

  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
