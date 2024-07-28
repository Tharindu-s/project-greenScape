const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
    inquiryDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unread",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", InquirySchema);
