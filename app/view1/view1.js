'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'RestCollectionFindService', function($scope, RestCollectionFindService) {
	var url = 'http://xtalus.apps.gedge.nl/simple/restful/services/Persons/actions/findPersonsContains/invoke';
	$scope.test = url;
	var zoekobject = {"achternaam(wildcards*Toegestaan)":"o"};
	RestCollectionFindService.restObject(url,zoekobject).then(
		function(data){
			$scope.test = data;
		}
	);
	
}]);