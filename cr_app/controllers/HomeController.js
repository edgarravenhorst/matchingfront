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
                var profile =

                profile = RestService.initRestObject(result[0].data);
                console.log('--------------------');
                console.log('>> This is you members: ');
                console.log(profile)
                console.log('----------------------------------------------------------------------');

                console.log('>> profile roles: ');
                console.log(profile.roles)
                console.log('----------------------------------------------------------------------');


                profile.myDemands.get().then(function(demands){
                    console.log('--------------------');
                    console.log('>> profile demands: ');
                    console.log(demands);
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
