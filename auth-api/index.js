const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Configure Env Variables
dotenv.config();

// Connect to DB
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("Connected to MongoDB!")
});

// Middleware
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);


// Listen
app.listen(5000, () => {
    console.log("Server running on port 5000!");
});