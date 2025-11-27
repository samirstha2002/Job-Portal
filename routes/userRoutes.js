const express = require("express");

const userController = require("./../controllers/userController");
const userAuth = require("./../middlewares/authMiddleware");
const router = express.Router();
//update user

router.put("/updateuser", userAuth, userController.updateUser);

module.exports = router;
