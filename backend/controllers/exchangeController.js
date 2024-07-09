const Exchange = require("../models/exchangeModel");
const mongoose = require("mongoose");

// Create new exchange request
const createExchange = async (req, res) => {
  const { read, description, senderId, recieverId, productId, state } =
    req.body;

  let emptyFields = [];

  if (!description) {
    emptyFields.push("description");
    return res.json({ error: "Please fill the description" });
  }

  if (!senderId) {
    emptyFields.push("senderID");
    return res.json({ error: "Please fill the senderID" });
  }
  if (!recieverId) {
    emptyFields.push("recieverID");
    return res.json({ error: "Please fill the recieverID" });
  }
  if (!productId) {
    emptyFields.push("productId");
    return res.json({ error: "Please fill the productId" });
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const exchange = await Exchange.create({
      read,
      description,
      senderId,
      recieverId,
      productId,
      state,
    });
    res.status(200).json(exchange);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createExchange,
};
