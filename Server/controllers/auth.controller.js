const userValidator = require("../validators/user.validator");
const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { generateAccessAndRefreshTokens } = require("../utils/TokenGenerator");

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
    // process.env.NODE_ENV == 'production' ? null : console.error(error);
    const errorMessage = "An error occurred during signup";
    const err = new ApiError(500, errorMessage);
    return next(err);
  }
};

// @desc login user/ set token & cookie
// route POST /auth/login
// access Public
const logInUser = async (req, res, next) => {
  try {

    const {email, username, password} = req.body;

    // if both email and username are not provided, show error || preventive check.
    if(!email && !username) {
      const err = new ApiError(400, "Email or username is required");
      return next(err);
    }

    // check if user exists by either username and email
    const user = await User.findOne({
      $or: [{username}, {email}]
    });

    // if user not found
    if(!user) {
      const err = new ApiError(404, "User does not exist!");
      return next(err);
    }

    // if user found, check password by the method defined in User model
    const passwordMatch = await user.matchPassword(password);      // its User and not user: user is an instance of User. matchPassword is a method of User and used to check password of our user.

    if(!passwordMatch) {
      const err = new ApiError(401, "Password is incorrect!");
      return next(err);
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user, next);

    const loggedInUser = await User.findById(user._id).select("-password, -refreshToken");

    const cookieOptions = {
      httpOnly: true,
      secure: true
    }

    return res.status(200)
    .cookie("access-token", accessToken, cookieOptions)
    .cookie("refresh-token", refreshToken, cookieOptions)
    .json({loggedInUser, message: "User logged in successfully", accessToken, refreshToken});

  } catch (error) {
    // Handle any errors that occur during the login process
    // process.env.NODE_ENV == 'production' ? null : console.error(error);
    const errorMessage = "An error occurred during login";
    const err = new ApiError(500, errorMessage);
    return next(err);
  }
};

// @desc logout user
// route POST /auth/logout
// access Public
const logOutUser = async (req, res, next) => {
  try {

    await User.findByIdAndUpdate(req.user._id, {
      $unset: {
        refreshToken: 1 // removes the field from the document
      }
    }, { new: true });

    // Clear the cookies
    const cookieOptions = {
      httpOnly: true,
      secure: true
    }

    // Response
    return res.status(200)
    .clearCookie("access-token", cookieOptions)
    .clearCookie("refresh-token", cookieOptions)
    .json({ message: "User logged out successfully" });
  
  } catch (error) {
    // Handle any errors that occur during the logout process
    const err = new ApiError(500, "An error occurred during logout");
    next(err);
  }
};

module.exports = {
  signUpUser,
  logInUser,
  logOutUser,
};
