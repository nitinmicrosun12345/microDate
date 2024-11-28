const express = require('express');
const macthRouter = express.Router();

macthRouter.get('/', (req, res) => {
    res.send('Match route is working');
});

module.exports = matchRouter;