var Team = require("../models/Team");


getTeams = (() => {
    var tempTeamArr = new Array();
    for (var i = 0; i < 5; i++) {
        tempTeamArr.push(new Team(i, i, i, i));
    }

    return tempTeamArr;
})(),

addTeam = (team) => {
    var newTeam = new Team(team.name, team.members, team.projects, team.repos);

    getTeams.push(newTeam);
}


module.exports = {
    getTeams: getTeams,
    addTeam: addTeam
};