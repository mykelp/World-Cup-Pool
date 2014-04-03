window.angular.module('wcp.services.groups', [])
  .factory('Groups', ['$resource', 
    function($resource){
      return $resource(
        'groups/:groupId', 
        {
          groupId:'@_id'
        }, 
        {
          update: {method: 'PUT'}
        }
      )
    }]);