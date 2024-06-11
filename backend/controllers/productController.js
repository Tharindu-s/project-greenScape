const Product = require("../models/productModel");

const mongoose = require("mongoose");

// get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

// get a single products
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// get products by category
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get products by user
const getProductsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const products = await Product.find({ userId }).sort({ createdAt: -1 });
    if (products.length === 0) {
      return res.status(404).json({ error: "No products found for this user" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  const {
    name,
    category,
    description,
    price,
    quantity,
    username,
    condition,
    userId,
  } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
    return res.json({ error: "Please fill the name" });
  }
  if (!category) {
    emptyFields.push("category");
    return res.json({ error: "Please fill the category" });
  }
  if (!description) {
    emptyFields.push("description");
    return res.json({ error: "Please fill the description" });
  }
  if (!price) {
    emptyFields.push("price");
    return res.json({ error: "Please fill the price" });
  }
  if (!quantity) {
    emptyFields.push("quantity");
    return res.json({ error: "Please fill the quantity" });
  }
  if (!username) {
    emptyFields.push("username");
    return res.json({ error: "Please fill the username" });
  }
  if (!userId) {
    emptyFields.push("username");
    return res.json({ error: "Please fill the userId" });
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const product = await Product.create({
      name,
      category,
      description,
      price,
      quantity,
      username,
      userId,
      condition,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
  getProductsByUser,
};
