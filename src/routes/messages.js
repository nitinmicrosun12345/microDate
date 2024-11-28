const express = require('express');
const mesaggeRouter = express.Router();

mesaggeRouter.get('/', (req, res) => {
    res.send('Messages route is working');
});

module.exports = messageRouter;