// packages
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const xss=require('xss-sanitize')
const mongoSanitizer= require('express-mongo-sanitize')

// files
const dbconnect = require("./config/db");
const authRouter = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorhandler");
const userRouter = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoutes");
dbconnect();

const app = express();

//middlewaresa
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);

app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on ${port} port`.bgGreen.white);
});
