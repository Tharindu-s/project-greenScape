const Service = require("../models/serviceModel");

const mongoose = require("mongoose");

// get all services services
const getServices = async (req, res) => {
  const services = await Service.find({}).sort({ createdAt: -1 });

  res.status(200).json(services);
};

// get a single service
const getService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such service" });
  }

  const service = await Service.findById(id);

  if (!service) {
    return res.status(404).json({ error: "No such service" });
  }

  res.status(200).json(service);
};

// get services by category
const getServicesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const services = await Service.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get services by professsional
const getServicesByProfessional = async (req, res) => {
  const { userId } = req.params;

  try {
    const services = await Service.find({ userId }).sort({
      createdAt: -1,
    });
    if (services.length === 0) {
      return res.status(404).json({ error: "No services found for this user" });
    }
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new service
const createService = async (req, res) => {
  const { name, category, description, price, username, userId, image } =
    req.body;

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
  if (!username) {
    emptyFields.push("username");
    return res.json({ error: "Please fill the username" });
  }
  if (!userId) {
    emptyFields.push("username");
    return res.json({ error: "Please fill the userId" });
  }
  if (!image) {
    emptyFields.push("image");
    return res.json({ error: "Please fill the image" });
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const service = await Service.create({
      name,
      category,
      description,
      price,
      username,
      userId,
      image,
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such service" });
  }

  const service = await Service.findOneAndDelete({ _id: id });

  if (!service) {
    return res.status(400).json({ error: "No such service" });
  }

  res.status(200).json(service);
};

// update a service
const updateService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such service" });
  }

  const service = await Service.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!service) {
    return res.status(400).json({ error: "No such service" });
  }

  res.status(200).json(service);
};

// search services

const searchService = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const products = await Service.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(limit)
      .skip(limit * page);

    const total = await Service.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    // include all below things on the reposnse not only the products object

    const response = {
      total,
      page: page + 1,
      limit,
      products,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getService,
  getServices,
  getServicesByCategory,
  getServicesByProfessional,
  createService,
  deleteService,
  updateService,
  searchService,
};
