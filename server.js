// packages
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const xss = require("xss-sanitize");
const mongoSanitizer = require("express-mongo-sanitize");

// files
const dbconnect = require("./config/db");
const authRouter = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorhandler");
const userRouter = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoutes");

//database connection
dbconnect();

// swagger api config
// swagger api options

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Js Express Job Portal Application",
    },
    servers: [
      {
        url: "http://127.0.0.1:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);
const app = express();
app.set("trust proxy", 1);
//middlewaresa
app.use(helmet());
app.use(cors({ origin: "*" })); // allow all origins
app.use(express.json());
app.use(morgan("dev"));
app.use(xss());
app.use(mongoSanitizer());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is running on ${port} port`.bgGreen.white);
});
