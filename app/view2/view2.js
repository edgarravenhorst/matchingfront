'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    //Deze is om te testen, maar werkt niet...
    resolve: {
            message: function(messageService){
                return messageService.getMessage();
    			}
    }
  });
}])

.controller('View2Ctrl', ['$scope', 'MatchingAllServices', 'Flatten', function($scope, MatchingAllServices, Flatten, message) {
	$scope.test1 = '123';
	$scope.test2 = '123';

	MatchingAllServices.getServices1().then(
		function(data){
			$scope.test1=data;
		}	
	);
	MatchingAllServices.getServices2().then(
		function(data){
			$scope.test2=data.originalElement;
		}
	);
	MatchingAllServices.getServices3().then(
		function(data){
			$scope.test3=data;
		}
	);
/*
	$scope.test3 = 'xxx';
	$scope.test3 = message;
*/
}]);