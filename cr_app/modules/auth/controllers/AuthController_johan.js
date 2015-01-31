'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$templateCache', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $templateCache, $rootScope, $location, AuthenticationService) {

        //Pogingen om caching te voorkomen, maar werkt niet goed
    	/*
		$templateCache.remove('/modules/home/views/home.html');
    	$templateCache.removeAll();
		*/

        // reset login status
        AuthenticationService.ClearCredentials();

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
    }]);
