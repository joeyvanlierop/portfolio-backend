const cors = require("cors");
const express = require("express");
const routes = require("./routes");

// Load Environment Variables
require("dotenv").config();

// Load port from environment variable
// Default port is 3000
const PORT = process.env.PORT || 3000;

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Begin listening on the predefined port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
