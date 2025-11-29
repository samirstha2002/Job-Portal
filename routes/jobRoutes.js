const express = require("express");
const jobController = require("./../controllers/jobController");
const router = express.Router();
const userAuth = require("./../middlewares/authMiddleware");
router.post("/create-job", userAuth, jobController.createJob);
router.get("/get-job",userAuth,jobController.getalljobs)
module.exports = router;
