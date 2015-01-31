define
(
    ['require','module/auth/AuthController'], function(require){

        function Module(){

            this.name = 'ImagesModule'

            this.register = function(){

                var app = require('app')
                var contentController = require('module/content/ContentController')
                app.controller( "contentController", ['$scope', '$compile', 'moduleService', contentController] )


            }
        }

        return new Module();
    }
);
