define(function(require) {

    function DemandsController($scope, RestService){
        $scope.searchQuery = "";

        this.$inject = ['$scope', 'RestService'];

        // ADD TO NETWORK
        $scope.addToNetwork = function(lastName){
            console.log('add '+lastName + ' to my network pls');
        }

        // SEARCH FUNCTION


                RestService.getServices(['Demands'])
                .then(function(data){

                    var persons = data.Demands

                    Demands.findDemands.post({lastName:$scope.searchQuery}).then(function(demand){
                        if(demand[0]){
                            var data = demand[0].data.members
                            console.log(data);
                            if(data.title.value)
                                $scope.results =  [{lastName: data.lastName.value ,value: data.firstName.value + ' ' + data.middleName.value + ' ' + data.lastName.value,picture: picture}]
                            else
                                $scope.results =  [{lastName: data.lastName.value ,value: data.firstName.value + ' ' + data.lastName.value,picture: picture}]
                        }

                        else{
                            $scope.results = []
                        }

                    });

                    return data
                })

            }


    return DemandsController;

});
