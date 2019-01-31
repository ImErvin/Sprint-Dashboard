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

        getTableRowTemplate: function(options){
            return core.Element.parse(rowTemplate(options));
        },

        getStyle: function () {
            return styles;
        },

        addRowToTable:function(){
           return this.getElement().find(_classPrefix+'sendBtn');
        },

        getReveivedList:function(){
           return this.getElement().find(_classPrefix+'receivedList');
        },

        getMessage:function(){
          return this.getElement().find(_classPrefix+'sendMessage');
        }
    });

});
