require.config({
    map:{
        // Maps
    },
    paths:{
        // Aliases and paths of modules
        'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min'
    },
    shim:{
        angular: {
            exports: 'angular'
        }
    }
});

require(
    ['routes', 'modules',
     'services/RestService',
     'controllers/HomeController',
     'controllers/ProfileController'
    ],
    function(routes, modules, RestService, HomeController, ProfileController) {

        var dependencies = [
            'ngRoute',
            'ngCookies',
            routes.name
        ]

        modules.register();
        dependencies = dependencies.concat(modules.list)

        var application = angular.module('Xtalus', dependencies);

        application.service('RestService', RestService)
        application.controller('HomeController', HomeController)
        application.controller('ProfileController', ['$scope', 'RestService', ProfileController])

        angular.bootstrap(document, ['Xtalus']);

    }
);
