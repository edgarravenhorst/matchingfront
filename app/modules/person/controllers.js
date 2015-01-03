'use strict';

angular.module('Person')

.controller('PersonController', [
	'$scope', 
	'$routeParams', 
	'urlcustomdecodeFilter', 
	'RestObjectService',
	'FormatRestObjectService', 
	function($scope, $routeParams, urlcustomdecode, RestObjectService, FormatRestObjectService){
/*
	$scope.test='123';
	$scope.personUrl = $routeParams.personUrl;
	$scope.filteredUrl = urlcustomdecode($routeParams.personUrl);
*/
	RestObjectService.restObject(urlcustomdecode($routeParams.personUrl)).then(
		function(data){
			$scope.allOfTypeProperty = FormatRestObjectService.allOfTypeProperty(data);
			$scope.allOfTypeCollection = FormatRestObjectService.allOfTypeCollection(data);
			$scope.allOfTypeAction = FormatRestObjectService.allOfTypeAction(data);
			$scope.personName = data.firstName.value;
		}	
	);
}]);
