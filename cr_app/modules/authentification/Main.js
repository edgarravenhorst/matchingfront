define
(
    ['require','module/auth/AuthController'], function(require){

        function Module(){

            this.name = 'ImagesModule'

            this.register = function(){

                var editor = require('editor')
                var contentController = require('module/content/ContentController')
                editor.controller( "contentController", ['$scope', '$compile', 'moduleService', contentController] )


            }
        }

        return new Module();
    }
);
