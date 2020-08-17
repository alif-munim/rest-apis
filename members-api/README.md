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