define(function(require) {

    function ProfileController($scope, RestService, $routeParams){

        this.$inject = ['$scope', 'RestService','$routeParams'];



            if($routeParams.lastName){

                RestService.getServices(['Persons'])
                .then(function(data){

                    var persons = data.Persons

                    persons.findPersons.post({lastName:$routeParams.lastName}).then(function(person){
                        if(person[0]){

                            $scope.profile = RestService.initRestObject(person[0].data);

                            if($scope.profile.picture){
                                picture = $scope.profile.picture;
                                picture = picture.split(':');
                                picture = picture[2];
                                $scope.profile.picture = picture;
                            }

                            // tussen oplossing om bugs te voorkomen, nog fixxe
                            if($scope.profile.middleName.get()){
                                $scope.profile.middleName = "";

                            }

                            console.log($scope.profile);

                        }

                        else{
                            //$scope.results = []
                        }

                    });

                    return data
                })

            }


        }



    return ProfileController;

});
