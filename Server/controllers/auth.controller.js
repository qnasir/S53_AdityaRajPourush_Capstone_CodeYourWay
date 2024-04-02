const userValidator = require("../validators/user.validator");
const User = require("../models/user.model");

// @desc register or signup user
// @route POST /auth/signup
// access Public
const signUpUser = async (req, res, next) => {
  try {
    const { error } = userValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      username,
      email,
      password,
      role,
      fullname,
      profileImage,
      refreshToken,
      questionsDone,
    } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409).json({ error: "User with this email already exists" });
    }

    // Check if the username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(409).json({ error: "This username already exists" });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
      role,
      fullname,
      profileImage,
      refreshToken,
      questionsDone,
    });

    // Send a JSON response with the message "User will Sign up here"
    res.status(201).json("User Signed Up !");
  } catch (error) {
    // Handle any errors that occur during the signup process
    console.error("Error occurred during signup:", error);
    const errorMessage = "An error occurred during signup";
    res.status(500).json({ error: errorMessage });
  }
};

// @desc login user/ set token & cookie
// route POST /auth/login
// access Public
const logInUser = async (req, res) => {
  try {
    // Send a JSON response with the message "User will Login here"
    res.json("User will Login here");
  } catch (error) {
    // Handle any errors that occur during the login process
    console.error("Error occurred during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

// @desc logout user
// route POST /auth/logout
// access Public
const logOutUser = async (req, res) => {
  try {
    // Send a JSON response with the message "User will Logout here"
    res.json("User will Logout here");
  } catch (error) {
    // Handle any errors that occur during the logout process
    console.error("Error occurred during logout:", error);
    res.status(500).json({ error: "An error occurred during logout" });
  }
};

module.exports = {
  signUpUser,
  logInUser,
  logOutUser,
};
