const express = require("express");
const indexRouter = express.Router();
// Import other routers
const userRouter = require("./user.js");
const matchRouter = require("./match.js");
const messagesRouter = require("./messages.js");

// Use other routers
indexRouter.use("/user", userRouter);
indexRouter.use("/match", matchRouter);
indexRouter.use("/message", messagesRouter);

// Import the index controller
const indexController = require("../controllers/index.js");

// Register a new user
userRouter.post("/signup", indexController.signupController);

// Login an existing user
userRouter.post("/login", indexController.loginController);


module.exports = indexRouter;
