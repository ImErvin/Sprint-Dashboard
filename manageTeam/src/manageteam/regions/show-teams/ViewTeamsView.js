define([
    'jscore/core',
    'text!./_viewteams.html',
    'template!./_tablerow.html',
    'styles!./_viewteams.less'
], function (core, mainViewTemplate,rowTemplate, styles) {
    'use strict';
    var _classPrefix=".eaManageTeam-rShowTeams-";

    return core.View.extend({

        getTemplate: function () {
            return mainViewTemplate;
        },

        getTableRowTemplate: function(options , editCallBack){
            var row = core.Element.parse(rowTemplate(options));
            row.find(_classPrefix+"ebTable-body-row-editBtn").addEventHandler('click',editCallBack);
            return row;
        },

        getStyle: function () {
            return styles;
        },

        addRowToTable:function(rowElement){
           return this.getElement().find(_classPrefix+'ebTable-body').append(rowElement);
        },

        resetTeamTable:function(){
            console.log( this.getElement().find(_classPrefix+'ebTable-body').children()) ;
            var s = this.getElement().find(_classPrefix+'ebTable-body');
            this.getElement().find(_classPrefix+'ebTable-body').children().forEach(element => {
                element.remove();
            });
        }

   });
});

