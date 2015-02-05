'use strict';

angular.module('Home')

.directive('matchingPersonlink', function(){
	return {
		restrict: 'E',
		scope: {
              		href: "@",
              		linkText: "@"
        		},
		template: '<a ng-href="#/person/{{href  | urlcustomencode }}">{{linkText}}</a>',
		replace: false
	}
});
