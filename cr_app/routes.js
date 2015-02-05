define(function(require){


    var routeModule = angular.module('RoutesModule', []).config(
        ['$routeProvider', function($routeProvider) {
        //poging om caching te voorkomen, maar werkt niet...
        var cacheBuster = Date.now().toString();
        $routeProvider
        .when('/login', {
            templateUrl: 'views/pages/login.htm',
            hideMenus: true
        })
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'views/pages/homepage.htm?cachebuster=' + cacheBuster
        })
        .when('/info', {
            //controller: 'AppelController',
            templateUrl: 'views/pages/info.htm?cachebuster=' + cacheBuster
        })
        .when('/person/:personUrl', {
            controller: 'PersonController',
            templateUrl: 'modules/person/views/person.html'
        })
        .when('/profile/:lastName', {
            controller: 'ProfileController',
            templateUrl: 'views/pages/profile.htm'
        })
        .otherwise({redirectTo: '/home'});
    }])

    //Check If user logged in and redirect
    .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        //console.log($rootScope.globals);
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }else if ($location.path() == '/login' && $rootScope.globals.currentUser ){
                $location.path('/home');
            }
        });
    }])
    ;

    return routeModule;
});
