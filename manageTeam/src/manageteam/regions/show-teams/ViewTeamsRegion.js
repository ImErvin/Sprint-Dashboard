define([
	'jscore/core',
	'./ViewTeamsView',
	'common/RestService',
	'common/Models',
	'i18n!manageteam/dictionary.json'
], function (core, View, restService, models, dictionary) {
	'use strict';
	return core.Region.extend({
		View: View,
		onStart: function () {
			delete this.team;
			this.view.resetTeamTable();
			restService.getTeams(this.renderTeams.bind(this), this.error.bind(this));

			var subscriptionId = this.getEventBus().subscribe('teamEdit', function (data) {
				this.teams.forEach(function (t) {
					if (t.name === data.team.name) {
						t = data.team;
					}
				});
			}.bind(this));

		},

		renderTeams: function (teams) {
			this.teams = teams;
			teams.forEach(function (team) {
				var element = this.view.getTableRowTemplate({
					team: team
				}, function () {
					var eventTeam = team;
					console.log('team ' + eventTeam.name + ' will be edited');
					this.getEventBus().publish('switchMessage', {
						region: 'EditTeam',
						team: eventTeam
					});
				}
					.bind(this));
				this.view.addRowToTable(element);
			}
				.bind(this));
		},

		error: function (err) { }

	});
});
