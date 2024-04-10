const User = require("../models/user.model")
const {ApiError} = require("../utils/ApiError")
const userValidator = require("../validators/user.validator");

// @desc get user profile
// @route GET /user/profile
// @access Private
const getUserProfile = async (req, res, next) => {
    try {
        return res.status(200).json({user: req.user, message: "User fetched Successfully" });
    } catch (error) {
        const err = new ApiError(500, error?.message || "Cannot get user profile");
        next(err);
    }
}


const updateUserProfile = async (req, res, next) => {
    
    try {
        const {error} = userValidator.validate(req.body);
        if (error){
            const err = new ApiError(409, error.details[0].message);
            return next(err);
        }
    
        const {username, email, fullname} = req.body;
    
        const userExists = await User.findOne({email, username, _id: {$ne: req.user._id}});
        if(userExists){
            const err = new ApiError(409, "User with this email or username already exists");
            return next(err);
        }
    
        const user = await User.findByIdAndUpdate(req.user._id,{
            $set: {username,
            email,
            fullname}
        }, {new: true}).select("-password -refreshToken");
    
        return res.status(200).json({user, message: "User updated successfully"});
    } catch (error) {
        const err = new ApiError(500, error?.message || "Cannot get user profile");
        next(err);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const {currentPassword, newPassword} = req.body;

        const user = await User.findById(req.user._id);
        const passwordMatch = await user.matchPassword(currentPassword);

        if(!passwordMatch){
            const err = new ApiError(401, "Current password is incorrect");
            return next(err);
        }

        user.password = newPassword;
        await user.save({validateBeforeSave: false});

        return res.status(200).json({message: "Password updated successfully"});
    } catch (error) {
        const err = new ApiError(500, error?.message || "Cannot get user profile");
        next(err);
    }
}



module.exports = {
    getUserProfile,
    updateUserProfile,
    updatePassword
}