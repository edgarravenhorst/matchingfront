'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', 'Flatten', 'MatchingAllServices', function($scope, Flatten, MatchingAllServices) {
	$scope.test1 = '123';
	$scope.test2 = '1234';
	$scope.test3 = {test: 'test'};

}]);