'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'restangular',
/*   'overallServices', */
  'matchingServices',
  'Authentication',
  'Home',
  'ngCookies',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
         .when('/login', {
            controller: 'LoginController',
            templateUrl: 'authentication/modules/authentication/views/login.html',
            hideMenus: true
        })
       	.when('/home', {
            controller: 'HomeController',
            templateUrl: 'authentication/modules/home/views/home.html'
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
.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
})
// VOORKOM CACHING van http headers (alleen al voor authentification!!
.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}]);