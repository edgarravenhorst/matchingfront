define
(
    ['require',
     'modules/auth/controllers/LoginController',
     'modules/auth/services/AuthService',
     'modules/auth/services/Base64Service',
    ], function(require){

        function Module () {

            this.register = function(){

                var module = angular.module('Authentication', []);

                var LoginController = require('modules/auth/controllers/LoginController')
                var AuthService = require('modules/auth/services/AuthService')
                var Base64Service = require('modules/auth/services/Base64Service')

                module.factory('AuthenticationService', ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout', AuthService]);
                module.factory('Base64', Base64Service);

                module.controller( "LoginController", ['$scope', '$templateCache', '$rootScope', '$location', 'AuthenticationService', LoginController ])

                return module
            }
        }

        return new Module();
    }
);
