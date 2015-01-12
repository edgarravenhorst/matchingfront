'use strict';

describe('myApp.profile module', function() {

  var scope, demandController;
  
  	beforeEach(module('myApp.profile'));
  	beforeEach(module('matchingServices'));
  	beforeEach(module('Filters'));
	beforeEach(inject(function ($controller, $rootScope) {  // inject $rootScope
    	scope = $rootScope.$new();
    	profileController = $controller('ProfileController',{$scope : scope});
	}));
	
  	describe('demand controller', function(){
    	it('should ....', function() {
     		expect(demandController).toBeDefined();
    	});

  	});
});