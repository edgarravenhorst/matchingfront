'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'RestPostService', function($scope, RestPostService) {
/*
	var allPersonsUrl = 'http://xtalus.apps.gedge.nl/simple/restful/services/Persons/actions/allPersons/invoke';
	RestCollectionFindService.restObject(allPersonsUrl).then(
		function(data){
			$scope.allPersons = data;
		}
	);
*/
	var url = 'http://xtalus.apps.gedge.nl/simple/restful/services/Persons/actions/findPersonsContains/invoke';
/*
	$scope.test = url;
	var zoekobject = {"achternaam(wildcards*Toegestaan)":"o"};
	RestCollectionFindService.restObject(url,zoekobject).then(
		function(data){
			$scope.test = data;
		}
	);
*/
	
	$scope.searchAction = function(){
		$scope.test1=$scope.searchstring;
		var zoekobject ={};
		zoekobject["achternaam(wildcards*Toegestaan)"] = $scope.searchstring;
		RestPostService.restObject(url,zoekobject).then(
			function(data){
				$scope.results = data;
			}
		);
	};
	$scope.$watch('searchstring', function(newVal, oldVal, scope) {
		if (newVal !== oldVal) {
			$scope.searchAction();
			$scope.showResults='show';
		};
	});
	
}]);