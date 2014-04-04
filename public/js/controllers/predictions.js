window.angular.module('wcp.controllers.predictions', [])
  .controller('PredictionsController', ['$scope', '$http', '$routeParams', '$location', 'Global', 'Matches', 'Groups', 'Predictions',
  	 function($scope, $http, $routeParams, $location, Global, Matches, Groups, Predictions) {

  	 	$scope.global = Global;
      $scope.predictions = [];
      $scope.stagePredictions = [];
      $scope.groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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
        $scope.populateGroups( null, function() {
          $scope.groups.forEach(function(group, i) {
            group.matches.sort(function(a,b) {
              if (a.matchNumber > b.matchNumber)
                return 1;
              if (a.matchNumber < b.matchNumber)
                return -1;
              return 0;
            });

            $scope.stagePredictions[i] = {
                stage: group.stage,
                matchPredictions:[],
                teams: group.teams
            }

            $scope.stagePredictions[i].teams.team_id1.team = group.teams.team_id1.team._id;
            $scope.stagePredictions[i].teams.team_id2.team = group.teams.team_id2.team._id;
            $scope.stagePredictions[i].teams.team_id3.team = group.teams.team_id3.team._id;
            $scope.stagePredictions[i].teams.team_id4.team = group.teams.team_id4.team._id;

            group.matches.forEach(function(match, j) {
              $scope.stagePredictions[i].matchPredictions[j] = {
                matchNumber: match.matchNumber
              }
            });
          });
        }); 
      };

      $scope.matchWinner = function(match, home, away) {
        if (match.score.home > match.score.away) {
          home.won++;
          away.loss++;
          home.points += 3;
        }
        else if (match.score.home < match.score.away) {
          away.won++;
          home.loss++;
          away.points += 3;
        }
        else {
          home.draw++;
          away.draw++;
          home.points++;
          away.points++;
        }

      }

      $scope.populateStagePredictionsTeams = function() {
        $scope.stagePredictions.forEach(function(stagePrediction) {
          var matches = stagePrediction.matchPredictions;
          stagePrediction.teams.team_id1.goalsfor = (matches[0].score.home + matches[2].score.home + matches[4].score.away);
          stagePrediction.teams.team_id1.goalsagainst = (matches[0].score.away + matches[2].score.away + matches[4].score.home);

          stagePrediction.teams.team_id2.goalsfor = (matches[0].score.away + matches[3].score.away + matches[5].score.home);
          stagePrediction.teams.team_id2.goalsagainst = (matches[0].score.home + matches[3].score.home + matches[5].score.away);

          stagePrediction.teams.team_id3.goalsfor = (matches[1].score.home + matches[2].score.away + matches[5].score.away);
          stagePrediction.teams.team_id3.goalsagainst = (matches[1].score.away + matches[2].score.home + matches[5].score.home);

          stagePrediction.teams.team_id4.goalsfor = (matches[1].score.away + matches[3].score.home + matches[4].score.home);
          stagePrediction.teams.team_id4.goalsagainst = (matches[1].score.home + matches[3].score.away + matches[4].score.away);

          $scope.matchWinner(matches[0], stagePrediction.teams.team_id1, stagePrediction.teams.team_id2);
          $scope.matchWinner(matches[1], stagePrediction.teams.team_id3, stagePrediction.teams.team_id4);
          $scope.matchWinner(matches[2], stagePrediction.teams.team_id1, stagePrediction.teams.team_id3);
          $scope.matchWinner(matches[3], stagePrediction.teams.team_id4, stagePrediction.teams.team_id2);
          $scope.matchWinner(matches[4], stagePrediction.teams.team_id4, stagePrediction.teams.team_id1);
          $scope.matchWinner(matches[5], stagePrediction.teams.team_id2, stagePrediction.teams.team_id3);
        });
        $scope.create();
      };

  	 	$scope.create = function() {
  	 		var prediction = new Predictions({
  	 			stagePredictions: this.stagePredictions
  	 		});

        var currentUser = $scope.global.currentUser();

  	 		prediction.$save(function (response) {
  	 			$location.path("predictions/" + response._id);
          currentUser.predictions = response._id;

          $http.put('/users/' + currentUser._id, currentUser).success(function(data) {
          });
        });

  	 		this.stagePredictions = [];
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