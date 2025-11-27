const appError = require("./../utils/appError");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack);

  // MongoDB Wrong ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id ${err.value}`;
    error = new appError(message, 404);
  }

  // MongoDB Duplicate Key (email unique error)
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new appError(message, 400);
  }

  // Mongoose Validation Errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");

    error = new appError(message, 400);
  }

  // JWT Invalid
  if (err.name === "JsonWebTokenError") {
    error = new appError("Invalid token", 401);
  }

  // JWT Expired
  if (err.name === "TokenExpiredError") {
    error = new appError("Token expired", 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error",
  });
};

module.exports = errorHandler;
