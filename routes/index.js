const express = require("express");
const contact = require("./contact");

const routes = express.Router();

routes.use("/contact", contact);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Hey! Listen!" });
});

module.exports = routes;
