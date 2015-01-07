'use strict';

describe('Person module', function() {

	var personCtrl, scope;
	beforeEach(module('Person'));
	beforeEach(module('matchingServices'));
	beforeEach(module('ngRoute'));
	beforeEach(module('Filters'));
	beforeEach(inject(function ($controller, $rootScope) {  // inject $rootScope
    	scope = $rootScope.$new();
    	personCtrl = $controller('PersonController',{$scope : scope});
	}));

  	describe('personCtrl', function(){
    	it('should ....', function() {
      		expect(personCtrl).toBeDefined();
    	});

 	});

});