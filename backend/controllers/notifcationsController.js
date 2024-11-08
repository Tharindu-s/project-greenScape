const Notifications = require("../models/notitificationModel");

const mongoose = require("mongoose");

// get all notifactions
const getNotification = async (req, res) => {
  const notifications = await Notifications.find({}).sort({ createdAt: -1 });

  res.status(200).json(notifications);
};

// Create new notifaction
const createNotifications = async (req, res) => {
  const { type, title, content } = req.body;

  // Collect any missing fields in an array
  let emptyFields = [];

  if (!type) emptyFields.push("type");
  if (!title) emptyFields.push("name");
  if (!content) emptyFields.push("category");

  // If there are missing fields, return an error response
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  // Add the notifaction to the database
  try {
    const notification = await Notifications.create({
      type,
      title,
      content,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNotification,
  createNotifications,
};
