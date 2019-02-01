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

updateTeam = (team) => {
    var index = function () {
        for(var i in getTeams){
            console.log(i);
            if (i.name == team.name){
                return getTeams.indexOf(i);
            }
        }
    }();

    getTeams[index] = team;
    console.log(getTeams);
}


module.exports = {
    getTeams: getTeams,
    addTeam: addTeam,
    updateTeam: updateTeam
};