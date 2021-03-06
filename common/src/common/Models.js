if(typeof define !== 'function'){
   var define = require('amdefine')(module);
}

define(function(){

   var Team = function(){
      this.name='';
      this.members = [];
      this.projects = [];
      this.repos = [];
   };
   var Member = function(){
      this.name='';
      this.email='';
   };
   var Project = function (){
       this.name='';
       this.sprints = [];
       this.test = {
         unit: false,
         integration: false
       };   

   };

   var Sprint = function(){
     this.points=0;
     this.commitsNo=0;
     this.lineOfCode=0;
   };

   return {
      Team:Team,
      Member:Member,
      Project:Project,
      Sprint:Sprint
   };

});