define(function (require){

        this.list = [
            require('modules/auth/Main'),
        ]

        this.register = function(){
            $.each(this.list, function(i,module){
                module.register();
            })
        }

        return this;

    }
);
