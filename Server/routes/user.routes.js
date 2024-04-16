const express = require("express");

const router = express.Router();

const { getUserProfile, updateUserProfile, updatePassword } = require("../controllers/user.controller");
const {verifyJWTToken} = require("../middleware/auth.middleware");


//Secured Routes
router.get("/profile", verifyJWTToken, getUserProfile);
router.patch('/update-profile', verifyJWTToken, updateUserProfile);
router.patch('/update-password', verifyJWTToken, updatePassword);

module.exports = router