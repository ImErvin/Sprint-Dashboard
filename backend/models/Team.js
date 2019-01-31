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
    },

    addMember: (member) => {
        this.members.push(member);
    },

    removeMember: (member) => {
        var index = this.members.indexOf(member);
        if(index > -1){
            this.members.splice(index, 1);
        }
    },

    addProject: (project) => {
        this.projects.push(project);
    },

    removeProject: (project) => {
        var index = this.projects.indexOf(project);
        if(index > -1){
            this.projects.splice(index, 1);
        }
    },

    addRepo: (repo) => {
        this.repos.push(repo);
    },

    removeRepo: (repo) => {
        var index = this.repos.indexOf(repo);
        if(index > -1){
            this.repos.splice(index, 1);
        }
    }
}

module.exports = Team;