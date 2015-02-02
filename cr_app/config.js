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

require(['routes', 'modules'],
  function(routes, modules) {

    var dependencies = [
        //add modules
        'ngRoute',
        'ngCookies',
        routes.name
    ]

    modules.register();
    sharedModules = dependencies.concat(modules.list)

    var application = angular.module('Xtalus', sharedModules);
    angular.bootstrap(document, ['Xtalus']);

  }
);
