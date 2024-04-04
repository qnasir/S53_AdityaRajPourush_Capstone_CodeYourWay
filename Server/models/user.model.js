const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,  // cloudinary url
      default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    refreshToken: {
      type: String,
    },
    questionsDone: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      }
    ]
  },
  {
    timestamps: true,
  }
);

// a pre—save middleware function that hashes the password using bcrypt before saving the user to the database.

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    return next();
  }

  // const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, 10);  // anyways generates salt and hashes the password
  next();
})


// a method that compares the entered password with the hashed password in the database.
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // returns a promise
};

// a method that generates a JWT Accesstoken for the user
// userSchema.methods.generateAccessToken = function() {
//     return jwt.sign(
//       {
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         fullname: this.fullname
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       {
//         expiresIn: process.env.ACCESS_TOKEN_VALIDITY
//       }
//     )
// }

// a method that generates a JWT Refreshtoken for the user
// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//       {
//         _id: this._id,
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: process.env.REFRESH_TOKEN_VALIDITY
//       }
//     )
// }

module.exports = mongoose.model("User", userSchema);
