const asyncHandler = require("express-async-handler");
const Job = require("./../models/jobModel");
exports.getalljobs = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find();

  res.status(200).json({
    success: true,
    results: jobs.length,
    jobs,
  });
});

exports.getjob = asyncHandler(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  res.status(200).json({
    success: true,

    job,
  });
});

exports.createJob = asyncHandler(async (req, res, next) => {
  const newjob = await Job.create(req.body);

  res.status(200).json({
    success: true,

    newjob,
  });
});

exports.updateJob = asyncHandler(async (req, res, next) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, {
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    updatedJob,
  });
});

exports.deleteJob = asyncHandler(async (req, res, next) => {
  const jobs = await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Job deleted sucessfully",
  });
});
