'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [
	'$scope', 
	'MatchingAllServices',
	'MatchingRestangularDefer',
	'RestCollectionService',
	function($scope, MatchingAllServices, MatchingRestangularDefer, RestCollectionService) {
	MatchingRestangularDefer.thisIsYou().then(
		function(data){
			RestCollectionService.restObject(data.href + '/collections/myDemands').then(
				function(data){
					$scope.listOfMyDemands = data;
				}
			);
		}
	);

}]);