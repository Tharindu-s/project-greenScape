require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/reviews");
const professionalRoutes = require("./routes/professional");
const projectRoutes = require("./routes/project");
const testRoutes = require("./routes/test");
const exchangeRoutes = require("./routes/exchange");
const conversationRoutes = require("./routes/conversation");
const messageRoutes = require("./routes/message");
const inquiryRoutes = require("./routes/inquiry");

// express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/professional", professionalRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/test", testRoutes);
app.use("/api/exchange", exchangeRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/inquiry", inquiryRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
