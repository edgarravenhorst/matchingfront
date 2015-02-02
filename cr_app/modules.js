define(function (require){

        this.list = [

        ]

        this.required = [
            require('modules/auth/Main'),
        ]

        this.register = function(){
            $.each(this.required, function(i,loadedMod){
                module = loadedMod.register();
                //angular.bootstrap(document, [module.name]);
                this.list.push(module.name);
            }.bind(this))
        }

        return this;

    }
);
