define(function(require) {

    function HomeController($scope, RestService){
        this.$inject = ['$scope', 'RestService'];

        RestService.getServices(['Tags', 'Persons'])
        .then(function(data){
            console.log(data);

            var persons = data.Persons
            var tags = data.Tags

            persons.thisIsYou.post().then(function(result){
                var profile = result[0]


                profile = RestService.initRestObject(result[0].data);
                console.log(profile)

                console.log('roles: ');
                console.log(profile.roles)

                console.log('demands: ');
                console.log(profile.myDemands.get())


                return result
            });

            tags.allTags.post().then(function(result){
                console.log('All tags: ');
                console.log(result);

                $scope.tags = result;
            });
        })
    };

    return HomeController;

});
