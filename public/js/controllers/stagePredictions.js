window.angular.module('wcp.controllers.predictions', [])
  .controller('PredictionsController', ['$scope', '$http', '$routeParams', '$location', 'Global', 'Matches', 'Groups', 'Predictions',
  	 function($scope, $http, $routeParams, $location, Global, Matches, Groups, Predictions) {

  	 	$scope.global = Global;
      $scope.predictions = [];

  	 	$scope.populateMatches = function(query, callback) {
  	 		Matches.query(query, function (matches) {
          matches.sort(function(a,b) {
            if (a.matchNumber > b.matchNumber)
              return 1;
            if (a.matchNumber < b.matchNumber)
              return -1;
            return 0;
          });
          $scope.matches = matches;
          if(callback)
            callback();
  	 		});
  	 	};

      $scope.populateGroups = function(query, callback) {
        Groups.query(query, function (groups) {
          groups.sort(function(a,b) {
            if (a._id > b._id)
              return 1;
            if (a._id < b._id)
              return -1;
            return 0;
          });
          $scope.groups = groups;
          if(callback)
            callback();
        });
      };

      $scope.populateStagePredictions = function() {
        $scope.populateGroups(null, function() {
          $scope.groups.forEach(function(group, i) {
            $scope.predictions.sort(function(a,b) {
              if(a.matchNumber > b.matchNumber)
                return 1;
              if(a.matchNumber < b.matchNumber)
                return -1;
              return 0;
            });

            $scope.stagePredictions[i] = {
              stage: group_id,
              matchPredictions: [],
              teams: group.teams
            }
          });
        });
      };

      $scope.populatePredictions = function() {
        $scope.populateMatches( null, function() {
          $scope.matches.forEach(function(match, i) {
            $scope.predictions[i] = {
              stage: match.stage,
              matchNumber: i+1
            };
          });
        });
      };

  	 	$scope.create = function() {
  	 		var prediction = new Predictions({
  	 			predictions: this.predictions
  	 		});

        var currentUser = $scope.global.currentUser();

  	 		prediction.$save(function (response) {
  	 			$location.path("predictions/" + response._id);
          currentUser.predictions = response._id;

          $http.put('/users/' + currentUser._id, currentUser).success(function(data) {
          });
        });

  	 		this.predictions = [];
  	 	};

  	 	$scope.update = function() {
  	 		var prediction = $scope.prediction;

  	 		prediction.$update(function() {
  	 			$location.path('predictions/' + prediction._id);
  	 		});
  	 	};

  	 	$scope.findOne = function() {
        if(!$scope.global.currentUser().predictions)
          $location.path('predictions/create')
        else {
          Predictions.get({ predictionId: $routeParams.predictionId }, function(prediction) {
            $scope.prediction = prediction
          });
        }
  	 	};
  	 }]);