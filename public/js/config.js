//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', { templateUrl: 'views/index.html' })
	.when('/teams', {templateUrl: 'views/teams/list.html'})
	.when('/teams/:teamId', {templateUrl: 'views/teams/view.html'})
	.when('/matches', {templateUrl: 'views/matches/list.html'})
	.when('/matches/:matchId', {templateUrl: 'views/matches/view.html'})
	.when('/groups', {templateUrl: 'views/groups/list.html'})
	.when('/groups/:groupId', {templateUrl: 'views/groups/view.html'})
	.when('/predictions/create', { templateUrl: 'views/predictions/create.html' })  
    .when('/predictions/:predictionId/edit', { templateUrl: 'views/predictions/edit.html' })
    .when('/predictions/:predictionId', { templateUrl: 'views/predictions/groupPrediction.html' })
	.otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);