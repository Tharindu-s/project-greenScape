const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rateSellerSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RateSeller", rateSellerSchema);
