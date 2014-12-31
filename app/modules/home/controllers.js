'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope',
    '$templateCache',
    'MatchingRestangularDefer',
    'RestObjectService',
    'RestCollectionService',
    'FormatRestObjectService',
    function ($scope, $templateCache, MatchingRestangularDefer, RestObjectService, RestCollectionService, FormatRestObjectService) {
    
    	//Pogingen om caching te voorkomen, maar werkt niet goed
    	/*
$templateCache.remove('/modules/home/views/home.html');
    	$templateCache.removeAll();
*/
    	
		MatchingRestangularDefer.thisIsYou().then(
			function(data){
				$scope.thisIsYou = data;
				RestObjectService.restObject(data.href).then(
					function(data){
						/*static*/
						$scope.firstName = data.firstName.value;
						$scope.middleName = data.middleName.value;
						$scope.lastName = data.lastName.value;
						$scope.roles = data.roles.value;
						$scope.uniqueActorId = data.uniqueActorId.value;
						/*dynamic*/
						$scope.allOfTypeProperty = FormatRestObjectService.allOfTypeProperty(data);
						$scope.allOfTypeCollection = FormatRestObjectService.allOfTypeCollection(data);
						$scope.allOfTypeAction = FormatRestObjectService.allOfTypeAction(data);
						/*level deeper to collection 'mySavedMatches'*/
						var _link_mySavedMatches = data.mySavedMatches.links[0].href;
						RestCollectionService.restObject(_link_mySavedMatches).then(
							function(data){
								$scope.listOfMySavedMatches = data;
								/*Again level deeper: first saved match*/
								var _link_object = data[0].href;
								RestObjectService.restObject(_link_object).then(
									function(data){
										$scope.allOfSavedMatchTypeProperty = FormatRestObjectService.allOfTypeProperty(data);
									}
								);
							}
						);
					}
				);
			}
		);
    }]);