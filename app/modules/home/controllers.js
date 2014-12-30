'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope',
    '$templateCache',
    'MatchingRestangularDefer',
    function ($scope, $templateCache, MatchingRestangularDefer) {
    
    	//Pogingen om caching te voorkomen, maar werkt niet goed
    	$templateCache.remove('/modules/home/views/home.html');
    	$templateCache.removeAll();
    	
		MatchingRestangularDefer.thisIsYou().then(
		function(data){
			$scope.thisIsYou = data;
		}		
	);
    }]);