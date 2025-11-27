const User = require("./../models/userModel");
const appError = require("./../utils/appError");
const asyncHandler = require("express-async-handler");

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { name, lastName, email, location } = req.body;
  if (!name || !lastName || !email || !location) {
    return next(new appError("all fields are mandatory", 400));
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) return next(new appError("User not found", 404));
  (user.name = name),
    (user.lastName = lastName),
    (user.email = email),
    (user.location = location);

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
});
