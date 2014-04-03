window.angular.module('wcp.services.matches', [])
  .factory('Matches', ['$resource', 
    function($resource){
      return $resource(
        'matches/:matchId', 
        {
          matchId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);