const ReportBlog = require("../models/ReportBlogModel");

const mongoose = require("mongoose");

// get all report
const getReports = async (req, res) => {
  const products = await ReportBlog.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

// Create new product
const createReport = async (req, res) => {
  const { title, content, blogId } = req.body;

  // Collect any missing fields in an array
  let emptyFields = [];

  if (!title) emptyFields.push("name");
  if (!content) emptyFields.push("category");

  // If there are missing fields, return an error response
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  // Add the product to the database
  try {
    const report = await ReportBlog.create({
      title,
      content,
      blogId,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete a product
const deleteReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such report" });
  }

  const report = await ReportBlog.findOneAndDelete({ _id: id });

  if (!report) {
    return res.status(400).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

module.exports = {
  createReport,
  getReports,
  deleteReport,
};