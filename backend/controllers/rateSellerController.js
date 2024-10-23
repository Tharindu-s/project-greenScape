const RateSeller = require("../models/rateSellerModel");

const mongoose = require("mongoose");

// get rating by seller
const getRatingsBySeller = async (req, res) => {
  const { sellerId } = req.params;

  try {
    const ratings = await RateSeller.find({ sellerId }).sort({ createdAt: -1 });
    if (ratings.length === 0) {
      return res.status(404).json({ error: "No ratings found for this user" });
    }
    res.status(200).json(ratings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a new rating
const addRating = async (req, res) => {
  const { rating, sellerId, userId } = req.body;

  let emptyFields = [];

  if (!rating) {
    emptyFields.push("title");
    return res.json({ error: "Please fill the rating" });
  }
  if (!sellerId) {
    emptyFields.push("sellerId");
    return res.json({ error: "Please fill the sellerId" });
  }
  if (!userId) {
    emptyFields.push("userId");
    return res.json({ error: "Please fill the userId" });
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const ratingoB = await RateSeller.create({
      rating,
      sellerId,
      userId,
    });
    res.status(200).json(ratingoB);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get overall rating by seller
const getOverallRatingBySeller = async (req, res) => {
  const { sellerId } = req.params;

  try {
    // Find all ratings for the seller
    const ratings = await RateSeller.find({ sellerId });

    // If no ratings are found, return an average rating of 0
    if (ratings.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    // Calculate the average rating
    const totalRating = ratings.reduce(
      (sum, ratingObj) => sum + ratingObj.rating,
      0
    );
    const averageRating = totalRating / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addRating,
  getRatingsBySeller,
  getOverallRatingBySeller,
};
