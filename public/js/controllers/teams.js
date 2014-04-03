window.angular.module('wcp.controllers.teams', [])
	.controller('TeamsController', ['$scope','$routeParams','$location','Global','Teams',
    	function ($scope, $routeParams, $location, Global, Teams) {
      		$scope.global = Global;

			$scope.find = function(query) {
				Teams.query(query, function(teams) {
					$scope.teams = teams;
				});
			};

 			$scope.findOne = function() {
 				Teams.get({teamId: $routeParams.teamId},function(team) {
 					$scope.team = team;
 				});
			};
    }]);