const express = require("express");

const router = express.Router();

const { getUserProfile, updateUserProfile } = require("../controllers/user.controller");
const {verifyJWTToken} = require("../middleware/auth.middleware");


//Secured Routes
router.get("/profile", verifyJWTToken, getUserProfile);
router.patch('/update-profile', verifyJWTToken, updateUserProfile);

module.exports = router