'use strict';

angular.module('Filters', [])
.filter('urlcustomencode', function(){
	return function(input){
		if (input) return (input.replace(/\//g,'__'));
	}
})
.filter('urlcustomdecode', function(){
	return function(input){
		if (input) return (input.replace(/__/g,'/'));
	}
});
