'use strict';

describe('myApp.view3 module', function() {

	var scope, view3Ctrl;
  	beforeEach(module('myApp.view3'));
  	beforeEach(module('matchingServices'));
  	beforeEach(inject(function ($controller, $rootScope) {  // inject $rootScope
    	scope = $rootScope.$new();
    	view3Ctrl = $controller('View3Ctrl',{$scope : scope});
	}));

  	describe('view3 controller', function(){

    it('should ....', function() {
      //spec body
      expect(view3Ctrl).toBeDefined();
    });

  });
});