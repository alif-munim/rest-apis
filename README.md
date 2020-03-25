# First REST API

A simple RESTful API created using Node.js, Express, & MongoDB.

*Shoutout to Dev Ed and his "Build a Restful Api" tutorial on YouTube*

## Connecting to MongoDB

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

## Mongoose Models

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

## Some Middleware

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

## Setting Routes

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

## CRUD Functionality

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