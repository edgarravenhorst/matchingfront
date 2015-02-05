define(function(require) {

    function ProfileController($scope, RestService, $routeParams){

        this.$inject = ['$scope', 'RestService','$routeParams'];



            if($routeParams.lastName){

                RestService.getServices(['Persons'])
                .then(function(data){

                    var persons = data.Persons

                    persons.findPersons.post({lastName:$routeParams.lastName}).then(function(person){
                        if(person[0]){
                            var data = person[0].data.members
                            $scope.profile = data;

                        }

                        else{
                            $scope.results = []
                        }

                    });

                    return data
                })

            }


        }



    return ProfileController;

});
