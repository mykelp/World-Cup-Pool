window.angular.module('wcp.controllers.matches', [])
	.controller('MatchesController', ['$scope','$routeParams','$location','Global','Matches',
    	function ($scope, $routeParams, $location, Global, Matches) {
      		$scope.global = Global;

			$scope.find = function(query) {
				Matches.query(query, function(matches) {
					$scope.matches = matches;
				});
			};

 			$scope.findOne= function() {
 				Matches.get({matchId: $routeParams.matchId},function(match) {
 					$scope.match = match;
 				});
			};
    }]);