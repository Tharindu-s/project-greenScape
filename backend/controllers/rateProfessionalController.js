const RateProfessional = require("../models/rateProfessionalModel");

const mongoose = require("mongoose");

// get rating by professional
const getRatingsByProfessional = async (req, res) => {
  const { professionalId } = req.params;

  try {
    const ratings = await RateProfessional.find({ professionalId }).sort({
      createdAt: -1,
    });
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
  const { rating, professionalId, userId } = req.body;

  let emptyFields = [];

  if (!rating) {
    emptyFields.push("title");
    return res.json({ error: "Please fill the rating" });
  }
  if (!professionalId) {
    emptyFields.push("professionalId");
    return res.json({ error: "Please fill the professionalId" });
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
    const ratingoB = await RateProfessional.create({
      rating,
      professionalId,
      userId,
    });
    res.status(200).json(ratingoB);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get overall rating by seller
const getOverallRatingByProfessionalI = async (req, res) => {
  const { professionalId } = req.params;

  try {
    // Find all ratings for the seller
    const ratings = await RateProfessional.find({ professionalId });

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
  getRatingsByProfessional,
  getOverallRatingByProfessionalI,
};
