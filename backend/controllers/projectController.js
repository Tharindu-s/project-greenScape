const Project = require("../models/projectModel");

const mongoose = require("mongoose");

// get all project
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });

  res.status(200).json(projects);
};

// get a single project
const getProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No such project" });
  }

  res.status(200).json(project);
};

// get projects by professional
const getProjectsByUser = async (req, res) => {
  const { professionalId } = req.params;

  try {
    const projects = await Project.find({ professionalId }).sort({
      createdAt: -1,
    });
    if (projects.length === 0) {
      return res.status(404).json({ error: "No projects found for this user" });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new projects
const createProject = async (req, res) => {
  const {
    projectName,
    category,
    description,
    location,
    professionalname,
    professionalId,
    images,
  } = req.body;

  let emptyFields = [];

  if (!projectName) {
    emptyFields.push("projectName");
    return res.json({ error: "Please fill the projectName" });
  }
  if (!category) {
    emptyFields.push("category");
    return res.json({ error: "Please fill the category" });
  }
  if (!description) {
    emptyFields.push("description");
    return res.json({ error: "Please fill the description" });
  }
  if (!location) {
    emptyFields.push("location");
    return res.json({ error: "Please fill the location" });
  }
  if (!professionalname) {
    emptyFields.push("professionalname");
    return res.json({ error: "Please fill the professionalname" });
  }
  if (!professionalId) {
    emptyFields.push("professionalId");
    return res.json({ error: "Please fill the professionalId" });
  }
  if (!images || !Array.isArray(images) || images.length === 0)
    emptyFields.push("images");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const project = await Project.create({
      projectName,
      category,
      description,
      location,
      professionalname,
      professionalId,
      images,
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findOneAndDelete({ _id: id });

  if (!project) {
    return res.status(400).json({ error: "No such project" });
  }

  res.status(200).json(project);
};

// update a project
const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!project) {
    return res.status(400).json({ error: "No such project" });
  }

  res.status(200).json(project);
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
  getProjectsByUser,
};
