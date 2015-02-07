define(function(require) {

    function ProfileController($scope, RestService, $routeParams){

        this.$inject = ['$scope', 'RestService','$routeParams'];



            if($routeParams.lastName){

                RestService.getServices(['Persons'])
                .then(function(data){

                    var persons = data.Persons

                    persons.findPersons({lastName:$routeParams.lastName}).then(function(profile){
                        if(profile.firstName){

                            $scope.profile = profile

                            if($scope.profile.picture){
                                picture = $scope.profile.picture;
                                picture = picture.split(':');
                                picture = picture[2];
                                $scope.profile.picture = picture;
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
