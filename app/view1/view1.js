'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'MatchingRestangular', 'MatchingRestangularFlat','MatchingRestangularFlatDefer', 'MatchingRestangularDefer', 'Flatten', function($scope, MatchingRestangular, MatchingRestangularFlat, MatchingRestangularFlatDefer, MatchingRestangularDefer, Flatten) {
	$scope.test = '123';
	$scope.test = MatchingRestangular.getOnePerson('L_1');
	$scope.test2 = MatchingRestangular.getFirstName('L_1');
	$scope.test3 = MatchingRestangular.getOnePersonProperty('L_1', 'firstName');
	MatchingRestangular.getOnePersonProperty('L_1', 'lastName').then(
		function(data){
			$scope.test4 = Flatten(data).value;
		}
	);
	$scope.test5 = MatchingRestangularFlat.getOneActorProperty('Person', 'L_1', 'firstName');
	$scope.test6 = MatchingRestangularFlat.getOneActorProperty('Person', 'L_1', 'lastName');
	//Dit is de beste: je weet zeker dat je een promise krijgt...
	MatchingRestangularFlatDefer.getOneActorProperty('Person', 'L_1', 'lastName').then(
		function(data){
			$scope.test7 = data.value;
		}
	);
	MatchingRestangularDefer.getAllServices().then(
		function(data){
			$scope.test8 = data;
		}		
	);
	MatchingRestangularDefer.getAllVraagstukken().then(
		function(data){
			$scope.test9 = data;
		}		
	);
	
}]);