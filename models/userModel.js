const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength:[8," password should be minimum of length of 8"]
    },
    location: {
      type: String,
      default: "Nepal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
