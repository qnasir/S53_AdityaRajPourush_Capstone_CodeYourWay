const express = require("express");

const router = express.Router();

const {signUpUser, logInUser, logOutUser} = require("../controllers/auth.controller");

router.post('/signup', signUpUser);
router.post('/login', logInUser);
router.post('/logout', logOutUser);

module.exports = router