'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope',
    '$templateCache',
    'MatchingRestangularDefer',
    'RestObjectService',
    function ($scope, $templateCache, MatchingRestangularDefer, RestObjectService) {
    
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
						$scope.firstName = data.firstName.value;
						$scope.middleName = data.middleName.value;
						$scope.lastName = data.lastName.value;
						$scope.roles = data.roles.value;
						$scope.uniqueActorId = data.uniqueActorId.value;
						var allOfTypeProperty = [];
						var allOfTypeCollection = [];
						var allOfTypeAction = [];
						angular.forEach(data, function(value, key){
							if(value.memberType === 'property'){
								var tmp = {};
								tmp={name : key, value : value.value};
								allOfTypeProperty.push(tmp);
							}
							if(value.memberType === 'collection'){
								var tmp = {};
								tmp={name : key, link : value.links[0].href};
								allOfTypeCollection.push(tmp);
							}
							if(value.memberType === 'action'){
								var tmp = {};
								tmp={name : key, link : value.links[0].href};
								allOfTypeAction.push(tmp);
							}							
						});
						$scope.allOfTypeProperty = allOfTypeProperty;
						$scope.allOfTypeCollection = allOfTypeCollection;
						$scope.allOfTypeAction = allOfTypeAction;

					}
				);
			}
		);
		
    }]);