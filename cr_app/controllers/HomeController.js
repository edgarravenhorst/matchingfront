define(function(require) {

    function HomeController($scope, RestService){
        this.$inject = ['$scope', 'RestService'];

        console.log('>> Person & Tag members');
        RestService.getServices(['Tags', 'Persons'])
        .then(function(data){
            console.log('----------------------------------------------------------------------');
            var persons = data.Persons
            var tags = data.Tags

            persons.thisIsYou.post().then(function(result){
                var profile
                profile = RestService.initRestObject(result[0].data);

                $scope.name = '';
                if (profile.firstName) $scope.name += profile.firstName
                if (profile.middleName) $scope.name += ' ' + profile.middleName
                if (profile.lastName) $scope.name += ' ' + profile.lastName

                console.log('--------------------');
                console.log('>> This is you members: ');
                console.log(profile)
                console.log('----------------------------------------------------------------------');

                console.log('>> profile roles: ');
                console.log(profile.roles)
                console.log('----------------------------------------------------------------------');


                profile.myDemands.get().then(function(collection){
                    console.log('--------------------');
                    console.log('>> profile demands: ');
                    console.log(collection.values);
                    $scope.demands = collection.values;
                    console.log('----------------------------------------------------------------------');
                });


                 profile.mySupplies.get().then(function(collection){
                    console.log('--------------------');
                    console.log('>> profile supplies: ');
                    console.log(collection.values);
                    $scope.supplies = collection.values;
                    console.log('----------------------------------------------------------------------');
                });

                return result
            });


            tags.allTags.post().then(function(result){
                console.log('All tags: ');
                console.log(result);
                console.log('----------------------------------------------------------------------');

                $scope.tags = result;
            });
        })
    };

    return HomeController;

});
