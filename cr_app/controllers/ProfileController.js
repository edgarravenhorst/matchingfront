define(function(require) {

    function ProfileController($scope, RestService){
        $scope.searchQuery = "";
        $scope.search = function(){

            if($scope.searchQuery){

                RestService.getServices(['Persons'])
                .then(function(data){

                    var persons = data.Persons

                    persons.findPersons.post({lastName:$scope.searchQuery}).then(function(person){
                        if(person[0]){
                            var data = person[0].data.members

                            // convert picture string base64
                            if(data.picture.value){
                                picture = data.picture.value;
                                picture = picture.split(':');
                                picture = picture[2];
                            }

                            if(data.middleName.value)
                                $scope.results =  [{uniqueID: data.uniqueID ,value: data.firstName.value + ' ' + data.middleName.value + ' ' + data.lastName.value,picture: picture}]
                            else
                                $scope.results =  [{uniqueID: data.uniqueID ,value: data.firstName.value + ' ' + data.lastName.value,picture: picture}]
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

    return ProfileController;

});
