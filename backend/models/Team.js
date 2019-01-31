var Team = function (name){
    this.name = name;

    return this;
}

Team.prototype = {
    updateName: (newName) => {
        this.name = newName;
    }
}

module.exports = Team;