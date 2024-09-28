const express = require("express");

const router = express.Router();

const {signUpUser, logInUser, logOutUser, newAccessToken, googleSignIn} = require("../controllers/auth.controller");
const { verifyJWTToken } = require("../middleware/auth.middleware");

router.post('/signup', signUpUser);
router.post('/login', logInUser);
router.post('/google-signin', googleSignIn)

router.post('/new-access-token', newAccessToken);

// Secured by JWT Token verification
router.post('/logout',verifyJWTToken, logOutUser);

module.exports = router