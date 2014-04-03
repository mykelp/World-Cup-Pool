window.angular.module('wcp.controllers.groups', [])
	.controller('GroupsController', ['$scope','$routeParams','$location','Global','Groups',
    	function ($scope, $routeParams, $location, Global, Groups) {
      		$scope.global = Global;
      		$scope.groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

			$scope.find = function(query) {
				Groups.query(query, function(groups) {
					$scope.groups = groups;
				});
			};

 			$scope.findOne= function() {
 				Groups.get({groupId: $routeParams.groupId},function(group) {
 					$scope.group = group;
 				});
			};
    }]);