define(function(require) {

    function HomeController($scope, RestService){

        $scope.searchQuery = 'rijn';

       RestService.getServices(['Persons', 'Organisations', 'Tags'])
        .then(function(data){
           console.log(data);

            var persons = data.Persons
            var tags = data.Tags

            tags.allTags.post().then(function(result){
                console.log('All tags: ');
                console.log(result);

                $scope.tags = result;

            });

            persons.allPersons.post().then(function(result){
                console.log('All Persons: ');
                console.log(result);
            });

            $scope.results = persons.findPersons.post({lastName:$scope.searchQuery}).then(function(person){

                var data = person[0].data.members
                $scope.results =  [{value: data.firstName.value + ' ' + data.middleName.value + ' ' + data.lastName.value}]

            });

            return data
        })
    };

    return HomeController;

});
