window.angular.module('wcp.services.predictions', [])
  .factory('Predictions', ['$resource',
  	function($resource) {
  	  return $resource(
  	  	'predictions/:predictionId',
  	  	{
  	  		predictionId: '@_id'
  	  	},
  	  	{
  	  		update: {method: 'PUT'}
  	  	}
  	  )
  	}]);