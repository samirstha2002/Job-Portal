const appError = require("./../utils/appError");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new appError("Authentication failed", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = { userId: payload.userId };
    next();
  } catch (err) {
    return next(new appError("Invalid or expired token", 401));
  }
});

module.exports = userAuth;
