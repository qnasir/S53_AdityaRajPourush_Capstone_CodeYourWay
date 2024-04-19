const express = require("express");

const router = express.Router();

const { getUserProfile, updateUserProfile, updatePassword, updateProfileImage, deleteProfile } = require("../controllers/user.controller");
const {verifyJWTToken} = require("../middleware/auth.middleware");
const { passwordUpdateLimiter } = require("../middleware/passwordUpdateLimiter.middleware");
const {upload} = require("../middleware/multer.middleware");


//Secured Routes

router.get("/profile", verifyJWTToken, getUserProfile);


router.patch('/update-profile', verifyJWTToken, updateUserProfile);
router.patch('/update-password', verifyJWTToken, passwordUpdateLimiter,  updatePassword);

router.patch("/profile-image", verifyJWTToken, upload.single("profileImage"), updateProfileImage)
router.delete("/delete-profile", verifyJWTToken, deleteProfile)

module.exports = router