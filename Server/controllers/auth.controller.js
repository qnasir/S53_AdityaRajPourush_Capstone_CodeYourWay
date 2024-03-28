
// @desc register or signup user 
// @route POST /auth/signup
// access Public
const signUpUser = async (req, res) => {
    try {
        // Send a JSON response with the message "User will Sign up here"
        res.status(201).json("User will Sign up here");
    } catch (error) {
        // Handle any errors that occur during the signup process
        console.error("Error occurred during signup:", error);
        const errorMessage = "An error occurred during signup";
        res.status(500).json({ error: errorMessage });
    }
}


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
}

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
}


module.exports = {
    signUpUser,
    logInUser,
    logOutUser
}