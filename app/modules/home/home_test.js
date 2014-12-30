'use strict';

describe('Home module', function() {

	var homeCtrl, scope;
	beforeEach(module('Home'));
	beforeEach(module('matchingServices'));
	beforeEach(module('restangular'));
	beforeEach(inject(function ($controller, $rootScope) {  // inject $rootScope
    	scope = $rootScope.$new();
    	homeCtrl = $controller('HomeController',{$scope : scope});
	}));

  	describe('homeCtrl', function(){
    	it('should ....', function() {
      		expect(homeCtrl).toBeDefined();
    	});

 	});
});