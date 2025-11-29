const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "company must have name"],
    },

    position: {
      type: String,
      required: [true, "job position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Kathmandu",
      required: [true, "worklocation is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
