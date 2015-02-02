define(function(require) {

    function LoginController($scope, $templateCache, $rootScope, $location, AuthenticationService){
        //controllerCode Angular

        AuthenticationService.ClearCredentials();

        $scope.view = 'mod';

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/home');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    };

    return LoginController;

});
