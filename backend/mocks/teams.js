var Team = require("../models/Team");


getTeams = (() => {
    var tempTeamArr = new Array();
    for (var i = 0; i < 5; i++) {
        tempTeamArr.push(new Team(i.toString(), i.toString(), i.toString(), i.toString()));
    }

    return tempTeamArr;
})(),

addTeam = (team) => {
    var newTeam = new Team(team.name, team.members, team.projects, team.repos);

    getTeams.push(newTeam);
}

updateTeam = (team) => {
    var index;

    for(var i of getTeams){
        if(team.name == i.name){
            index = getTeams.indexOf(i);
        }
    }
    getTeams[index] = team;
}


module.exports = {
    getTeams: getTeams,
    addTeam: addTeam,
    updateTeam: updateTeam
};