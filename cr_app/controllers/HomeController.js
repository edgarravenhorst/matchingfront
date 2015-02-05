define(function(require) {

    function HomeController($scope, RestService){
        this.$inject = ['$scope', 'RestService'];

        RestService.getServices(['Organisations', 'Tags'])
        .then(function(data){
            console.log(data);

            var persons = data.Persons
            var tags = data.Tags

            tags.allTags.post().then(function(result){
                console.log('All tags: ');
                console.log(result);

                $scope.tags = result;
            });
        })
    };

    return HomeController;

});
