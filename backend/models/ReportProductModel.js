const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReportProduct", ReportProductSchema);
