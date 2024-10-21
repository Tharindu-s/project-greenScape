const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportBlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    blogId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReportBlog", ReportBlogSchema);
