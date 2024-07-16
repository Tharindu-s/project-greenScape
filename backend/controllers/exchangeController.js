const Exchange = require("../models/exchangeModel");
const mongoose = require("mongoose");

// Create new exchange request
const createExchange = async (req, res) => {
  const {
    read,
    description,
    senderId,
    senderName,
    recieverId,
    recieverName,
    productId,
    productName,
    senderState,
    recieverState,
  } = req.body;

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
      senderName,
      recieverId,
      recieverName,
      productId,
      productName,
      senderState,
      recieverState,
    });
    res.status(200).json(exchange);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get recieved requests by user
const getRecievedExchangesByUser = async (req, res) => {
  const { recieverId } = req.params;

  try {
    const exchanges = await Exchange.find({ recieverId }).sort({
      createdAt: -1,
    });
    if (exchanges.length === 0) {
      return res
        .status(404)
        .json({ error: "No exchange requests found for this user" });
    }
    res.status(200).json(exchanges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get sent requests by user
const getSentExchangesByUser = async (req, res) => {
  const { senderId } = req.params;

  try {
    const exchanges = await Exchange.find({ senderId }).sort({
      createdAt: -1,
    });
    if (exchanges.length === 0) {
      return res
        .status(404)
        .json({ error: "You haven't sent any exchange requests" });
    }
    res.status(200).json(exchanges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update an exchange request
const updateRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const exchange = await Exchange.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!exchange) {
    return res.status(400).json({ error: "No such request" });
  }

  res.status(200).json(exchange);
};

module.exports = {
  createExchange,
  getRecievedExchangesByUser,
  getSentExchangesByUser,
  updateRequest,
};
