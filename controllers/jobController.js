const asyncHandler = require("express-async-handler");
const Job = require("./../models/jobModel");
const appError = require("./../utils/appError");

exports.createJob = asyncHandler(async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next(new appError("company and position are mandatory"));
  }
  req.body.createdBy = req.user.userId;
  const newjob = await Job.create(req.body);

  res.status(200).json({
    success: true,

    newjob,
  });
});

exports.getalljobs = asyncHandler(async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(200).json({
    success: true,
    results: jobs.length,
    jobs,
  });
});
