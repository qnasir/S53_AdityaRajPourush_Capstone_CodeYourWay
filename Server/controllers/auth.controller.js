const userValidator = require("../validators/user.validator");
const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");

// @desc register or signup user
// @route POST /auth/signup
// access Public
const signUpUser = async (req, res, next) => {
  try {
    // console.log(userValidator.validate(req.body));
    const { error } = userValidator.validate(req.body);
    if (error) {
      const err = new ApiError(409, error.details[0].message);
      return next(err);
    }

    const { username, email, password, role, fullname, profileImage } =
      req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      const err = new ApiError(409, "User with this email already exists");
      return next(err);
    }

    // Check if the username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      // return res.status(409).json({ error: "This username already exists" });
      const err = new ApiError(409, "This username already exists");
      return next(err);
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
      role,
      fullname,
      profileImage,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res.status(500).json({ error: "User could not be created" });
    }

    // Send a JSON response with the message "User will Sign up here"
    return res
      .status(201)
      .json({ createdUser, message: "user signed up successfully" });
  } catch (error) {
    // Handle any errors that occur during the signup process
    console.error("Error occurred during signup:", error);
    const errorMessage = "An error occurred during signup";
    return res.status(500).json({ error: errorMessage });
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
