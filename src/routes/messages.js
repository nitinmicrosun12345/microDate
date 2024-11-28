const express = require('express');
const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
    res.send('Messages route is working');
});

module.exports = messagesRouter;