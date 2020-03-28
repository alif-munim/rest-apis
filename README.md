# Auth API

A login and register API with authentication using JSON web tokens.

## Required packages

The following packages were used:

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

```
npm install express mongoose dotenv jsonwebtoken bcryptjs
```