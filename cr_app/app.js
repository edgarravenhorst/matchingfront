'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Person', []);

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'restangular',
  'matchingServices',
  'Authentication',
  'Home',
  'Person',
  'ngCookies',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.demand',
  'myApp.profile',
  'myApp.version',
  'Filters',
  'matchingDirectives'
])
// Poging om chaching van partials (templates) te voorkomen; werkt niet volgens mij
.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
})
// deze doet ook niets
.run(function($rootScope, $templateCache) {
   $rootScope.$on('$routeChangeStart', function() {
      $templateCache.removeAll();
   });
})
.config(['$routeProvider', function($routeProvider) {
	//poging om caching te voorkomen, maar werkt niet...
	var cacheBuster = Date.now().toString();
  $routeProvider
         .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html?cachebuster=' + cacheBuster,
            hideMenus: true
        })
       	.when('/home', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html?cachebuster=' + cacheBuster
        })
        .when('/person/:personUrl', {
        	controller: 'PersonController',
        	templateUrl: 'modules/person/views/person.html'
        })
  		.otherwise({redirectTo: '/home'});
}]).
config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }])
// VOORKOM CACHING van http headers (alleen al voor authentification!!
.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);
