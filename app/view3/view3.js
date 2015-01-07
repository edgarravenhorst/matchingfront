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
	'RestObjectService',
	'RestCollectionService',
	'FormatRestObjectService',
	'GetRestCollection', 
	'ThisIsYouUrl',
	'$q',
	function($scope, GetRestObject, RestObjectService, RestCollectionService, FormatRestObjectService, GetRestCollection, ThisIsYouUrl, $q) {
	
		var alles = function(){
			return(
			
///////////

				ThisIsYouUrl.then(
					function(YourUrl){
						var _thisIsYouUrl = YourUrl;
						return GetRestObject.restObject(_thisIsYouUrl);
					}
				).then(
					function(persondata){
						$scope.test =  persondata;
						$scope.firstName = persondata.allOfTypePropertyObject.firstName;
						$scope.middleName = persondata.allOfTypePropertyObject.middleName;
						$scope.lastName = persondata.allOfTypePropertyObject.lastName;
						$scope.uniqueId = persondata.allOfTypePropertyObject.uniqueActorId;
						$scope.roles = persondata.allOfTypePropertyObject.roles;
						$scope.myDemands=persondata.allOfTypeCollectionObject.myDemands;
						return GetRestCollection.restObject(persondata.allOfTypeCollectionObject.myDemands);
					}
				).then(
					function(collectiondata){
						$scope.myDemandsObject = collectiondata.collectionList;
						var _promises = [];
						angular.forEach(collectiondata.collectionList, function(value, key){
		/* 					_promises.push(RestObjectService.restObject(value.href)); */
							_promises.push(RestCollectionService.restObject(value.href + '/collections/demandProfiles')); //direct stap dieper
						});
						return $q.all(_promises);
					}
				).then(
					function(promises){
						var _output = [];
						angular.forEach(promises, function(value, key){
		/* 					_output.push(FormatRestObjectService.allOfTypeCollectionObject(value)); */
							_output.push(value);
						});
						$scope.promises = _output;
					}
				)
			
//////////			
			);
		}
		
		alles();	

}]);