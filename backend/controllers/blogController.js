const Blog = require("../models/blogModel");

const mongoose = require("mongoose");

// Create new blog
const createBlog = async (req, res) => {
  const { title, category, content, userId, coverImg } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
    return res.json({ error: "Please fill the title" });
  }
  if (!category) {
    emptyFields.push("category");
    return res.json({ error: "Please fill the category" });
  }
  if (!content) {
    emptyFields.push("content");
    return res.json({ error: "Please fill the content" });
  }
  if (!userId) {
    emptyFields.push("username");
    return res.json({ error: "Please fill the userId" });
  }
  if (!coverImg) {
    emptyFields.push("coverImg");
    return res.json({ error: "Please fill the coverImg" });
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const blog = await Blog.create({
      title,
      category,
      content,
      userId,
      coverImg,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });

  res.status(200).json(blogs);
};

// get blogs by user
const getBlogsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 });
    if (blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found for this user" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(400).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

// update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog" });
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!blog) {
    return res.status(400).json({ error: "No such blog" });
  }

  res.status(200).json(blog);
};

// search blogs

const searchBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const blogs = await Blog.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(limit)
      .skip(limit * page);

    const total = await Blog.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    // include all below things on the reposnse not only the blogs object

    const response = {
      total,
      page: page + 1,
      limit,
      blogs,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogsByUser,
  createBlog,
  deleteBlog,
  updateBlog,
  searchBlogs,
};
