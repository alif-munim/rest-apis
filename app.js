const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

// Middleware
// Can be used for authentication
app.use(bodyParser.json());

// Import Routes
const postRoute = require("./routes/posts");
app.use("/posts", postRoute);

// Routes
app.get("/", (req, res) => {
    res.send("This is the home page!");
});


// Deprecation Warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to DB!")
});



// Listen
app.listen(5000, () => {
    console.log("Server started on port 5000!");
})