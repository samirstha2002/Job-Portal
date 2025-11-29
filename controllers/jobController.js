const asyncHandler = require("express-async-handler");
const Job = require("./../models/jobModel");
const appError = require("./../utils/appError");

exports.createJob = asyncHandler(async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return next(new appError("company and position are mandatory", 400));
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

exports.updatejob = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    return next(new appError("company and position are mandatory", 400));
  }
  const job = await Job.findOne({ _id: id });
  if (!job) {
    return next(new appError("no jobs found with this id", 404));
  }
  if (req.user.userId !== job.createdBy.toString()) {
    return next(new appError("you are not authorized to update this job", 403));
  }

  const updateJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,

    updateJob,
  });
});
exports.deletejob = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findOne({ _id: id });
  if (!job) {
    return next(new appError("no jobs found with this id", 404));
  }
  if (req.user.userId !== job.createdBy.toString()) {
    return next(new appError("you are not authorized to delete this job", 403));
  }

  await Job.deleteOne();
  res.status(200).json({
    success: true,
    message: " Job Deleted sucessfully",
  });
});
