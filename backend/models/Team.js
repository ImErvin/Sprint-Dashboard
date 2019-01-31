var Team = function (name, members, projects, repos) {
    this.name = name;
    this.members = members;
    this.projects = projects;
    this.repos = repos;
    return this;
}

Team.prototype = {
    updateTeam: (name, members, projects, repos) => {
        this.name = name;
        this.members = members;
        this.projects = projects;
        this.repos = repos;
    }
}

module.exports = Team;