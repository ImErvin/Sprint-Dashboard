const express = require('express');
const router = express.Router();
const mock = require("../mocks/teams");

router.route('/teams')
.get((req, res, next) => {
    res.status(200).send(mock.getTeams);
})
.post((req, res, next) => {
    mock.addTeam(req.body);
    res.status(201).send();
})
.put((req, res, next) => {
    mock.updateTeam(req.body);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8585');
    res.status(204).send();
});

router.route('/teams/{name}')
.get((req, res, next) => {
    
})



module.exports = router;