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
     'providers/RestService',
     'controllers/HomeController',
     'controllers/ProfileController',
     'controllers/PersonController',
     'controllers/DemandsController'
    ],
    function(routes, modules, RestService, HomeController, ProfileController,PersonController,DemandsController) {

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
        application.controller('ProfileController', ProfileController)
        application.controller('PersonController', PersonController)
        application.controller('DemandsController', DemandsController)
        angular.bootstrap(document, ['Xtalus']);

    }
);
