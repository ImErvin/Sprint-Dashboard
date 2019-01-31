var Team = require("../models/Team");

var teams = (() => {
    var tempTeamArr = new Array();
    for(var i = 0; i < 5; i++){
        tempTeamArr.push(new Team(i, i, i, i));
    }

    return tempTeamArr;
})();

module.exports = teams;