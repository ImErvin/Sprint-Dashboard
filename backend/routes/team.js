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
    //mock.updateTeam(req.body);
    res.status(200).send();
});



module.exports = router;