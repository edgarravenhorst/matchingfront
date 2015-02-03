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
     'controllers/HomeController'
    ],
    function(routes, modules, RestService, HomeController) {

        var dependencies = [
            'ngRoute',
            'ngCookies',
            routes.name
        ]

        modules.register();
        dependencies = dependencies.concat(modules.list)

        var application = angular.module('Xtalus', dependencies);

        application.service('RestService', ['$http', '$q', RestService])
        application.controller('HomeController', ['$scope', 'RestService', HomeController])

        angular.bootstrap(document, ['Xtalus']);

    }
);
