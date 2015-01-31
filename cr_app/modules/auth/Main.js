define
(
    ['require','modules/auth/controllers/AuthController'], function(require){

        function Module(){

            this.name = 'ImagesModule'

            this.register = function(){

                var app = require('app')
                var AuthController = require('modules/auth/controllers/AuthController')
                app.controller( "AuthController", ['$scope', '$compile', 'moduleService', AuthController] )


            }
        }

        return new Module();
    }
);
