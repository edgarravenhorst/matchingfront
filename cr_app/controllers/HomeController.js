define(function(require) {

    function HomeController($scope, RestService){

        console.log(RestService.getService(['Persons']));

    };

    return HomeController;

});
