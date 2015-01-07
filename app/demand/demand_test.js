'use strict';

describe('myApp.demand module', function() {

  var scope, demandController;
  
  	beforeEach(module('myApp.demand'));
  	beforeEach(module('matchingServices'));
  	beforeEach(module('Filters'));
	beforeEach(inject(function ($controller, $rootScope) {  // inject $rootScope
    	scope = $rootScope.$new();
    	demandController = $controller('DemandController',{$scope : scope});
	}));
	
  	describe('demand controller', function(){
    	it('should ....', function() {
     		expect(demandController).toBeDefined();
    	});

  	});
});