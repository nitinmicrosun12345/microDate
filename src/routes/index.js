const express = require("express");
const indexRouter = express.Router();
// Import other routers
const userRouter = require('./user')
const matchRouter = require('./match');
const messagesRouter = require("./messages");

// Use other routers
indexRouter.use("/user", userRouter);
indexRouter.use("/match", matchRouter);
indexRouter.use("/message", messagesRouter);

// Import the index controller
const indexController = require("../controllers/index.js");

// Register a new user
indexRouter.post("/signup", indexController.signupController);

// Login an existing user
indexRouter.post("/login", indexController.loginController);


module.exports = indexRouter;
