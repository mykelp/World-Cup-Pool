window.app = angular.module('WorldCupPool', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'wcp.controllers', 'wcp.directives', 'wcp.filters', 'wcp.services']);

// bundling dependencies
window.angular.module('wcp.controllers', ['wcp.controllers.header','wcp.controllers.index', 'wcp.controllers.teams', 'wcp.controllers.matches', 'wcp.controllers.groups', 'wcp.controllers.predictions' ]);
window.angular.module('wcp.services', ['wcp.services.global','wcp.services.teams', 'wcp.services.matches', 'wcp.services.groups', 'wcp.services.predictions' ]);