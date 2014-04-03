window.angular.module('wcp.controllers.header', [])
  .controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
      $scope.global = Global;

      $scope.userPredictions = function() {
        if($scope.global.isSignedIn()) {
          return $scope.global.currentUser().username
        } else {
          return ""
        }
      }

      $scope.navbarEntries = [
          {
            "title": "Teams",
            "link": "teams"
          },
          {
            "title": "Matches",
            "link": "matches"
          },
          {
            "title": "Groups",
            "link": "groups"
          },
          {
            "title": "Predictions",
            "link": "predictions/prediction_id_" + $scope.userPredictions()
          }          
    ];
  }]);