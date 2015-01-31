define
(
    ['require',
     'modules/auth/controllers/LoginController',
     'modules/auth/services/AuthService',
     'modules/auth/services/Base64Service',
    ], function(require){

        function Module () {

            this.register = function(){

                var app = require('app')
                var AuthController = require('modules/auth/controllers/LoginController')
                var AuthService = require('modules/auth/services/AuthService')
                var Base64Service = require('modules/auth/services/Base64Service')

                app.factory('AuthenticationService', AuthService);
                app.factory('Base64', Base64Service);

                app.controller( "LoginController", ['$scope', AuthController] )
            }
        }

        return new Module();
    }
);
