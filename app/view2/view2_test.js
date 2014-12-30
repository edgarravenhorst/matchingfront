'use strict';

describe('myApp.view2 module', function() {

	var scope, view2Ctrl;
  	beforeEach(module('myApp.view2'));
  	beforeEach(module('overallServices'));
  	beforeEach(module('restangular'));
  	beforeEach(module('matchingServices'));
  	beforeEach(inject(function ($controller, $rootScope) {  // inject $rootScope
    	scope = $rootScope.$new();
    	view2Ctrl = $controller('View2Ctrl',{$scope : scope});
	}));

  	describe('view2 controller', function(){

    it('should ....', function() {
      //spec body
      expect(view2Ctrl).toBeDefined();
    });

  });
});