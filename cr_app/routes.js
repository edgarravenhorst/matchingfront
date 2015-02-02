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
            controller: 'HomeController',
            templateUrl: 'views/pages/info.htm?cachebuster=' + cacheBuster
        })
        .when('/person/:personUrl', {
            controller: 'PersonController',
            templateUrl: 'modules/person/views/person.html'
        })
        .otherwise({redirectTo: '/home'});
    }]);

    return routeModule;
});
