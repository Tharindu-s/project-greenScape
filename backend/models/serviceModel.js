const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
