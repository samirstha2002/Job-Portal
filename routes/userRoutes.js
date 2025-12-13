const express = require("express");

const userController = require("./../controllers/userController");
const userAuth = require("./../middlewares/authMiddleware");
const router = express.Router();

//get user data
router.post("/getuser", userAuth, userController.getuser);
//update user

router.put("/updateuser", userAuth, userController.updateUser);

module.exports = router;
