const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3010;
const teamsRoutes = require('./routes/team');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/', teamsRoutes);

app.get('/', (req, res) => {
    res.status(200).send("Welcome to Dashboard API - Available routes [/teams]");
})

app.listen(port, () => {
    console.log("Listening on localhost:" + port);
});

