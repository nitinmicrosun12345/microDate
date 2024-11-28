const express = require('express');
const matchRouter = express.Router();

matchRouter.get('/', (req, res) => {
    res.send('Match route is working');
});

module.exports = matchRouter;