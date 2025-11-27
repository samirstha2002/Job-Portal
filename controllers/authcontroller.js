const User = require("./../models/userModel");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All Fields Are Mandatory",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).json({
        success: false,
        message: "Email already registered. Please log in",
      });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      status: true,
      message: "User registered sucessfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Problem in registration",
      error: err.message,
    });
  }
};
