const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exchangeSchema = new Schema(
  {
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
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
    recieverName: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exchange", exchangeSchema);
