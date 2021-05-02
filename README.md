# rest-apis
Some of my first attempts at building my own REST APIs.
<br/><br/>

## table of contents
* [first-rest](#first-rest)
* [members-api](#members-api)
* [auth-api](#auth-api)

<hr/>

# First REST
A simple RESTful API created using Node.js, Express, & MongoDB.

*Shoutout to Dev Ed and his "Build a Restful Api" tutorial on YouTube*


## 💽 Connecting to MongoDB

Use the mongoose ORM to connect to MongoDB Atlas.

Installation:

```
npm i mongoose
```

Connection:
Note: install node package "dotenv" to protect username and password. Assign **DB_CONNECTION** variable to connection URL.

```
const mongoose = require("mongoose");

// Deprecation Warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to DB!")
});
```


## 🦡 Mongoose Models

Create a schema for posts.

In models/Post.js:

```
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Posts", PostSchema);
```


## 🎁 Some Middleware

Install CORS to allow for cross-origin connections and body-parser to access request bodies:

```
npm i cors body-parser
```

Add the required middleware:

```
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
```


## 🏄‍♂️ Setting Routes

Cleaning things up.

In app.js:

```
const postRoute = require("./routes/posts");
app.use("/posts", postRoute);
```

In routes/posts.js:

```
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

...

module.exports = router;
```


## ✏ CRUD Functionality

Use the following functions:

* router.get()
  To retrieve information from db.
* router.post()
  To post new information to db.
* router.delete()
  To delete information from db.
* router.patch()
  To update information in db.


### Example: Update

Access request parameters. Use mongo options to set new values.

```
// Update a Post
router.patch("/:postID", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postID}, 
            { $set: { title: req.body.title } });
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
```
<br/><br/>

<hr/>

# Members API
A simple API that returns member information as JSON data.

Created using express.

*With a little help from Brad Travery's "Express Crash Course"*

## Simple Express Server

Creating a local server in express is much quicker than doing so in Node.js

```
const express = require("express");
const path = require("path");

const app = express();

// Set Static
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
```

## Methods

The following methods are used for CRUD functionality:

* **app.get()**
  To retrieve information from a database (or file).
* **app.post()**
  To send information to a database (or file).
* **app.put()**
  To update information in a database (or file).
* **app.delete()**
  To delete information from a database (or file).

## Other Notes

**Middleware** has access to the request and response objects. It is usually initialized as follows:

```
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
```

**Static** path is set as follows:

```
app.use(express.static(path.join(__dirname, "public")));
```

**Routes** can be set in a separate folder using express Router.

In index.js:

```
app.use("/api/members", require("./routes/api/members"));
```

In routes/api/members.js:

```
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json(members));

module.exports = router;
```

<br/><br/>

<hr/>

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

<br/>
<br/>

### 💨 Express Setup

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
<br/>
<br/>

### 🏄‍♂️ Setting Routes

```
// Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
```
<br/>
<br/>

### 💽 Connecting to MongoDB

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
<br/>
<br/>

### 🎟 Validation: @hapi/joi

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

// Login Validation: Same Idea

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
```
<br/>
<br/>

### 🔐 Hashing Passwords: bcrypt

Ensure that the post route callback is async. Must await **bcrypt.genSalt()** and **bcrypt.hash()**

```javascript
router.post("/register", async (req, res) => {

    // Data Validation: See Validation: @hapi/joi

    // User Exists? Mongo .findOne()

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    // Create User

    // Try Catch Block: Save User
});

```
<br/>
<br/>

### 👛 Verify Tokens

In ./verifyToken.js:

```
const jwt = require("jsonwebtoken");

// Auth Middleware
module.exports = function(req, res, next) {
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Access Denied");
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}
```
<br/>
<br/>

### 💂‍♂️ Protected Routes: Example

Use verify function from ./verifyToken.js as middleware.

```
const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
    res.json({ 
        posts: {
            title: "1st Post",
            description: "Private data! Do not share!"
        }
    });
})

module.exports = router;
```