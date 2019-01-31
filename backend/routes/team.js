const express = require('express');
const router = express.Router();
const mock = require("../mocks/teams");

router.get('/teams', (req, res, next) => {
    res.status(200).send(mock);
})

module.exports = router;