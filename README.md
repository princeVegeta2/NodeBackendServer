# Overview

This is a NodeJS based server/api which was configured to test out AWS integration of Elastic Beanstalk and Aws to provide various backend functionalities.

# Functionality

This server allows the user to sign up, sign in and allows the server to fetch User data from the RDS PostgreSQL database using `GET`. It also utilizes JWT(Json Web Token) and signs them with a secret key to work with user data and `authController`.

# Warning

If you are planning to use this application or reuse parts of the code, make sure to configure CORS in `app.js` properly, since they are set to be extremely permissive for testing purposes. Moreover, make sure to re-configure `db.js` to disallow non-SSL request. The self-signed certificates were allowed to test free tier Elastic Beanstalk functionality which does now give an SSL-protected route to work with. The querying of the database is also hardcoded directly in the controller and there are no abstractions to minimize testing time.

# Controllers

### Auth controller

The `authController.js` script is responsible for main sign up and sign in logic. It uses `bcrypt` library's encryption methods to has the password for user safety and uses a `jsonwebtoken` library to sign tokens for Sign Up and Sign In logic. For the `signup` async method, it uses a simple `INSERT` query, for the `signin` async method it uses a simple `SELECT` with a filter.

### User Data Controller

The `userDdataController.js` script is responsible for fetching various data from the user table. It uses our `authenticate.js` middleware to verify receives Json Web Tokens and provide data to the user, whose ID was encoded into the head.

### ProjectDataController

A simple implementation of a primitive `POST` method to allow the user to add a project to the `projects` table.

# Middleware

The `authenticate.js` is the middleware of this server. It decodes a received Json Web Token and attaches it to it's `.req` which can be accessed directly in controllers that import the middleware.

# Routes

### Auth routes

This is a simple setup to allow the server to use the `authController.js` to perform `POST` methods.

### User Data rotues

Unlike the Auth Routes, these routes also include the `authenticate.js` middleware which is used to an extend mentioned above.

### Project data routes

A simple implementation using a `POST` method to allow an authenticated user to create a project.

### Health routes

Checks all methods to return `Ok(200)` request for a healthcheck.

# Database setup

The `db.js` file is setup for a database integration. Make sure to **Change** this part if you are planning on doing something with this server:
```
    ssl: {
        rejectUnauthorized: false, // This allows self-signed certificates
    }
```

# App.js

This is where all of our routes are exposed and our `PORT` is set. Make sure to change CORS to be less permissive:
```
// Enabling cors
app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }));
```

# Conclusion

This simple server was made to test the waters with various AWS backend services. No licenses are applied.
