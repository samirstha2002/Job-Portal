const asyncHandler = require("express-async-handler");
const Job = require("./../models/jobModel");
const appError = require("./../utils/appError");
const mongoose = require("mongoose");
const moment = require("moment");
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
  const { status, workType, search, sort } = req.query;
  //conditions for search filter
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }

  if (search) {
    queryObject.position = {
      $regex: search,
      $options: "i",
    };
  }
  let queryResult = Job.find(queryObject);

  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }

  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }

  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  const jobs = await queryResult;
  // const jobs = await Job.find({ createdBy: req.user.userId });
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

exports.jobStats = asyncHandler(async (req, res, next) => {
  const stats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  //default stats
  let statsObj = {};
  stats.forEach((item) => {
    statsObj[item._id] = item.count;
  });
  const defaultStats = {
    pending: statsObj.pending || 0,
    reject: statsObj.reject || 0,
    interview: statsObj.interview || 0,
  };

  // monthly yearly stats
  let monthlyApplication = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ results: stats.length, defaultStats, monthlyApplication });
});
