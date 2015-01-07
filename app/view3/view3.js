'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', [
	'$scope',
	'GetRestObject', 
	'ThisIsYouUrl',
	'$q',
	function($scope, GetRestObject, ThisIsYouUrl, $q) {
/* 		var defer = $q.defer(); */
		ThisIsYouUrl.then(
			function(data){
				var _thisIsYouUrl = data;
				GetRestObject.restObject(_thisIsYouUrl).then(
					function(data){
						$scope.test =  data;
						//DIT WERKT OOK AL NIET
/*
						defer.resolve(
								angular.forEach(
									data.allOfTypeCollectionDetails, 
									function(value, key){
										if (value.name === 'myDemands') {
											$scope.test1 = value.details;
										};
									})
									
							);
*/
						
						
						// Het volgende werkt niet - ws moeten er eerst resolves plaatsvinden ?!
/*
						angular.forEach(data.allOfTypeCollectionDetails, function(value, key){
							if (value.name == 'myDemands') {
								$scope.test1 = value.details;
							} else {
								$scope.test1 = key;
							}
						});
*/
					}
				);
			}
		);
/* 		$scope.test1 = defer.promise;		 */
}]);