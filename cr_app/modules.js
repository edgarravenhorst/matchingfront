define(function (require){

        this.list = [
            require('module/layout/Main'),
            require('module/navigation/Main'),
            require('module/images/Main'),
            require('module/content/Main')
        ]

        this.register = function(){
            $.each(this.list, function(i,module){
                module.register();
            })
        }

        return this;

    }
);
