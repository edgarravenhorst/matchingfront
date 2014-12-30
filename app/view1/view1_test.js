'use strict';

describe('myApp.view1 module', function() {

  var scope, view1Ctrl;
  
  	beforeEach(module('myApp.view1'));
	beforeEach(inject(function ($controller, $rootScope) {  // inject $rootScope
    	scope = $rootScope.$new();
    	view1Ctrl = $controller('View1Ctrl',{$scope : scope});
	}));
	
  	describe('view1 controller', function(){
    	it('should ....', function() {
     		expect(view1Ctrl).toBeDefined();
    	});

  	});
});