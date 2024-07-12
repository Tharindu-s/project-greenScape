const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// create new review
const createReview = async (req, res) => {
  const { title, content, productId, username } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!content) {
    emptyFields.push("content");
  }
  if (!productId) {
    emptyFields.push("productId");
  }
  if (!username) {
    emptyFields.push("userName");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const review = await Review.create({ title, content, productId, username });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch all reviews for a specific product
const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const reviews = await Review.find({ productId });
    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByProductId,
};
