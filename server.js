// packages
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

// files
const dbconnect = require("./config/db");
const authRouter = require("./routes/authRoutes");
dbconnect();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on ${port} port`.bgGreen.white);
});
