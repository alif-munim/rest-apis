const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const members = require("./Members");
const logger = require("./middleware/logger");

const app = express();

// Middleware has access to req and res objs
// See ./middleware/logger.js

// Init Middleware
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Set Static
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
