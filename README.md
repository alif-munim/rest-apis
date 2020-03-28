# Auth API

A login and register API with authentication using JSON web tokens.

## Required packages

The following packages were used:

```
npm install express mongoose dotenv jsonwebtoken bcryptjs @hapi/joi
```

* **express**
  
  A web application framework for Node.js. For routes and request handling.
* **mongoose**
  
  An object data modeling (ODM) library for MongoDB and Node.js. 
  Provides schema validation, and data mapping to MongoDB, a document based NoSQL database.
* **dotenv**
  
  To store environment variables. Mainly information that should not be visible to users, 
  such as the db connection url and json web token secret.
* **jsonwebtoken**
  
  Standard tool for creating access tokens to be used in an application. JSON web tokens are
  stored in the "auth-token" field of request headers to provide access to protected routes.
* **bcryptjs**
  
  For password hashing. 
* **@hapi/joi**

  For schema validation. Check required fields, minimum lengths, and valid emails.

### Express Setup

```
const express = require("express");
const app = express();

// Middleware For Request Body Parsing
app.use(express.json());

// Listen
app.listen(5000, () => {
    console.log("Server running on port 5000!");
});
```

### Setting Routes

```
// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
```

### Connecting to MongoDB

Import mongoose and dotenv libraries. DB connection link is stored in the DB_CONNECT environment variable.

```
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configure Env Variables
dotenv.config();

// Connect to DB
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("Connected to MongoDB!")
});
```

### Validation: @hapi/joi

```
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    // Data Validation
    return schema.validate(data);
}

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    // Data Validation
    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
```

### Hashing Passwords: bcrypt

```
router.post("/register", async (req, res) => {

    // Data Validation 
    ...

    // User Exists?
    ...

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    // Create User
    ...

    try {
        // Save User
        ...
    } catch(err) {
        // Return Errors
        ...
    }
});

```