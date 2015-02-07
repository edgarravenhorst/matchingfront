define(function(require) {

    function PersonController($scope, RestService){
        $scope.searchQuery = "";

        this.$inject = ['$scope', 'RestService'];

        // ADD TO NETWORK
        $scope.addToNetwork = function(lastName){
            console.log('add '+lastName + ' to my network pls');
        }

        // SEARCH FUNCTION
        $scope.search = function(){

            if($scope.searchQuery){

                RestService.getServices(['Persons'])
                .then(function(data){

                    var persons = data.Persons

                    persons.findPersons({lastName:$scope.searchQuery}).then(function(person){
                        var picture = ''

                        if(person.firstName){
                            // convert picture string base64
                            if(person.picture){
                                picture = person.picture;
                                picture = picture.split(':');
                                picture = picture[2];
                            }

                            if(data.middleName)
                                $scope.results =  [{lastName: person.lastName ,value: person.firstName + ' ' + person.middleName + ' ' + person.lastName, picture: picture}]
                            else
                                $scope.results =  [{lastName: person.lastName ,value: person.firstName + ' ' + person.lastName, picture: picture}]
                        }

                        else{
                            $scope.results = []
                        }

                    });

                    return data
                })

            }
        }
    };

    return PersonController;

});
