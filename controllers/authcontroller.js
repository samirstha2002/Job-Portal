const User = require("./../models/userModel");
const appError = require("./../utils/appError");
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new appError("All Fields are mandatory", 400));
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new appError("Email already registered ", 400));
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      status: true,
      message: "User registered sucessfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
