'use strict';

angular.module('matchingDirectives',[])

.directive('matchingDemandlink', function(){
	return {
		restrict: 'E',
		scope: {
              		href: "@",
              		linkText: "@"
        		},
		template: '<a ng-href="#/demand/{{href  | urlcustomencode }}">{{linkText}}</a>',
		replace: false
	}
})

.directive('matchingNewProfileButton', function(){
	return {
		restrict: 'E',
		scope: {
              		href: "@",
              		linkText: "@"
        		},
		template: '<a ng-href="#/profile/{{href  | urlcustomencode }}">{{linkText}}</a>',
		replace: false
	}
});		