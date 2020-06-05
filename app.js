const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./api/routes");

// Load Environment Variables
require("dotenv").config();

// Load port from environment variable
// Default port is 3000
const PORT = process.env.PORT || 3000;

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

// Begin listening on the predefined port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Connect to mongo database
mongoose
  .connect("mongodb://64.225.36.24:27017/csgo", {
    auth: {
      authSource: "admin",
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (err) => {
      console.log(err);
    }
  );
