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

require(['app', 'modules'],
  function(app, modules) {

    modules.register();

    angular.bootstrap(document, ['Xtalus_app']);



  }
);
