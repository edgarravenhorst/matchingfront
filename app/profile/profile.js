'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile/:profileUrl', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileController'
  });
}])
.controller('ProfileController', [
	'$scope', 
	'$routeParams', 
	'urlcustomdecodeFilter', 
	'RestObjectService',
	'FormatRestObjectService',
	'RestCollectionService',
	'GetRestObject',
	'$rootScope',
	function($scope, $routeParams, urlcustomdecode, RestObjectService, FormatRestObjectService, RestCollectionService, GetRestObject, $rootScope){
	
		$scope.profileUrl = $routeParams.profileUrl;
		
		if ($routeParams.profileUrl == 'new'){
			$scope.profileDescription = 'Maak nieuw profiel';

				RestObjectService.restObject($rootScope.matching_href).then(
					function(data){
						// uitsplitsen course en personsdemand 
						// NIET ERG ELEGANT!!
						if (data.newCourseDemandProfile != null){
							$scope.test = data.newCourseDemandProfile.links[0].href;
						}
						if (data.newPersonDemandProfile != null){
							$scope.test = data.newPersonDemandProfile.links[0].href;
						}						
					}
				);
				
				//posting
				$scope.postLink = function (url, param) {
					alert(url + '/invoke');
				};
			
		} else {
			RestObjectService.restObject(urlcustomdecode($routeParams.profileUrl)).then(
				function(data){
					//dynamic
					$scope.allOfTypeProperty = FormatRestObjectService.allOfTypeProperty(data);
					$scope.allOfTypeCollection = FormatRestObjectService.allOfTypeCollection(data);
					$scope.allOfTypeAction = FormatRestObjectService.allOfTypeAction(data);
					//static
					$scope.profileDescription = data.profileName.value;
				}	
			);
		}
	}]);
