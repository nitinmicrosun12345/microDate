const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send('Messages route is working');
});

module.exports = userRouter;