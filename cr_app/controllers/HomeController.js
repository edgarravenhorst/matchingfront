define(function(require) {

    function HomeController($scope, RestService){

        var persons = RestService.getServices(['Persons'])

        console.log(persons);


    };

    return HomeController;

});
