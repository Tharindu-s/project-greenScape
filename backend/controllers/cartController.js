const Cart = require("../models/cartModel");

const mongoose = require("mongoose");

// Create new items
const createCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let emptyFields = [];

  if (!userId) {
    emptyFields.push("userId");
    return res.json({ error: "Please fill the userId" });
  }
  if (!productId) {
    emptyFields.push("productId");
    return res.json({ error: "Please fill the productId" });
  }
  if (!quantity) {
    emptyFields.push("quantity");
    return res.json({ error: "Please fill the quantity" });
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const cartItem = await Cart.create({
      userId,
      productId,
      quantity,
    });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get items by professional
const getItemsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const cartItem = await Cart.find({ userId }).sort({
      createdAt: -1,
    });
    if (cartItem.length === 0) {
      return res.status(404).json({ error: "No items found" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a item
const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const cartItem = await Cart.findOneAndDelete({ _id: id });

  if (!cartItem) {
    return res.status(400).json({ error: "No such item" });
  }

  res.status(200).json(cartItem);
};

module.exports = {
  createCartItem,
  getItemsByUser,
  deleteCartItem,
};
