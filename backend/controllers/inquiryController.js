const Inquiry = require("../models/inquiryModel");

const mongoose = require("mongoose");

// Create new product
const createInquiry = async (req, res) => {
  const { senderId, senderName, recieverId, inquiryDescription, phone } =
    req.body;

  let emptyFields = [];

  if (!senderId) {
    emptyFields.push("senderId");
    return res.json({ error: "Please fill the senderId" });
  }
  if (!senderName) {
    emptyFields.push("senderName");
    return res.json({ error: "Please fill the senderName" });
  }
  if (!recieverId) {
    emptyFields.push("recieverId");
    return res.json({ error: "Please fill the receiverId" });
  }
  if (!inquiryDescription) {
    emptyFields.push("inquiryDescription");
    return res.json({ error: "Please fill the inquiry" });
  }
  if (!phone) {
    emptyFields.push("phone");
    return res.json({ error: "Please fill the phone" });
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const inquiry = await Inquiry.create({
      senderId,
      senderName,
      recieverId,
      inquiryDescription,
      phone,
    });
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single inquiry
const getInquiry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const inquiry = await Inquiry.findById(id);

  if (!inquiry) {
    return res.status(404).json({ error: "No such inquiry" });
  }

  res.status(200).json(inquiry);
};

// get inquiries by user
const getInquiriesByUser = async (req, res) => {
  const { recieverId } = req.params;

  try {
    const inquiry = await Inquiry.find({ recieverId }).sort({ createdAt: -1 });
    if (inquiry.length === 0) {
      return res.status(404).json({ error: "No inquiry found for this user" });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createInquiry,
  getInquiry,
  getInquiriesByUser,
};
