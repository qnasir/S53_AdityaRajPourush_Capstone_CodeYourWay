const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Middleware for handling not found errors
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Port to run the server on
const port = process.env.PORT || 3000;

// Create the Express app
const app = express();

// Allow incoming requests to have a JSON body
app.use(express.json());

// Allow incoming requests to have a URL encoded body
app.use(express.urlencoded({extended: true}));

// Routes for the authentication
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

// Root route handler
app.get("/", (req, res) => res.send(`Server running on port ${port}`));

// Middleware for handling errors
app.use(notFound);
app.use(errorHandler);

// Listen for incoming requests
app.listen(port, () => console.log(`Listening on port ${port}`));