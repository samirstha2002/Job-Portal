const express = require("express");
const jobController = require("./../controllers/jobController");
const router = express.Router();

router.route("/").get(jobController.getalljobs).post(jobController.createJob);
router
  .route("/:id")
  .get(jobController.getjob)
  .put(jobController.updateJob)
  .put(jobController.deleteJob);

module.exports = router;
