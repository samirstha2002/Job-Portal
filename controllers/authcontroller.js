const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const appError = require("./../utils/appError");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, lastName } = req.body;

  if (!name || !email || !password) {
    return next(new appError("All Fields are mandatory", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new appError("Email already registered ", 400));
  }

  const user = await User.create({ name, email, password, lastName });
  const token = await user.createJWT();
  res.status(201).json({
    success: true,
    message: "User registered sucessfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError("please provide email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new appError("Invalid email or password", 400));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new appError("Invalid email or password", 400));
  }
  user.password = undefined;
  const token = await user.createJWT();

  res.status(200).json({
    success: true,
    message: "login sucessfully",
    user,
    token,
  });
});
