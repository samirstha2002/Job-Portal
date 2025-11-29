const express = require("express");
const jobController = require("./../controllers/jobController");
const router = express.Router();
const userAuth = require("./../middlewares/authMiddleware");
router.post("/create-job", userAuth, jobController.createJob);
router.get("/get-job", userAuth, jobController.getalljobs);
router.patch("/update-job/:id", userAuth, jobController.updatejob);
router.delete("/delete-job/:id", userAuth, jobController.deletejob);
module.exports = router;
