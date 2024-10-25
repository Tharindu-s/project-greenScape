const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rateProfessionalSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    professionalId: {
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

module.exports = mongoose.model("RateProfessional", rateProfessionalSchema);
