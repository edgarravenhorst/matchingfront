define(function(require) {

    function HomeController($scope, RestService){
        this.$inject = ['$scope', 'RestService'];


        RestService.getServices(['Tags', 'Persons', 'Organisations', 'Demands', 'Profiles', 'TagCategories'])
        .then(function(data){

            var persons = data.Persons,
                tags = data.Tags,
                tagsCategories = data.TagCategories

            console.log('=== Services ============================================================');
            console.log(data);
            console.log('-------------------------------------------------------------------------');

            persons.thisIsYou().then(function(profile){

                $scope.name = '';
                if (profile.firstName) $scope.name += profile.firstName
                if (profile.middleName) $scope.name += ' ' + profile.middleName
                if (profile.lastName) $scope.name += ' ' + profile.lastName

                console.log('=== userData ============================================================');
                console.log(profile)
                console.log('-------------------------------------------------------------------------');

                profile.myDemands().then(function(collection){
                    $scope.demands = collection;
                });

                profile.mySupplies().then(function(collection){
                    $scope.supplies = collection;
                });
            });

            tags.allTags().then(function(collection){
                console.log('=== All tags: ============================================================');
                console.log(collection);
                console.log('-------------------------------------------------------------------------');
                $scope.tags = collection;
            });

            tagsCategories.allTagCategories().then(function(collection){
                $scope.createTag = function(e){
                    collection[0].newTag({
                        tagDescription: $scope.tagName
                    }).then(function(result){
                        console.log(result)
                    })
                }
            });


        })
    };

    return HomeController;

});
