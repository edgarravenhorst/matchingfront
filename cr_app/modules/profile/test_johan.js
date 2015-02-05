'use strict';

describe('Home module', function() {

	var homeCtrl, scope, compile, httpBackend, authRequestHandler;
	beforeEach(module('Home'));
	beforeEach(module('Filters'));
	beforeEach(module('matchingServices'));
	beforeEach(module('restangular'));
	beforeEach(inject(function (_$controller_, _$rootScope_, _$compile_) {  // inject $rootScope
    	scope = _$rootScope_;
    	homeCtrl = _$controller_('HomeController',{$scope : scope});
    	compile = _$compile_;
	}));
	beforeEach(inject(function($injector) {
		httpBackend = $injector.get('$httpBackend');
		// Set up the mock http service responses
		authRequestHandler = httpBackend.when('GET', '/auth.py')
                            .respond({userId: 'userX'}, {'A-Token': 'xxx'});
	}));

	//TODO: PROBLEEM NA IN TOEVOEGEN VAN $location in de controller
/*
  	describe('homeCtrl', function(){
    	it('should ....', function() {
      		expect(homeCtrl).toBeDefined();
    	});

 	});
*/

/*
 	describe('matchingPersonlink', function(){
    	it('should ....', function() {
    		var element = compile('<matching-personlink href="bla/bla" link-text="test"></matching-personlink>')(scope);
      		expect(element).toBeDefined();
      		// Het lukt nog niet om de waardes te laden met digest loop...
       		//	scope.$digest();
      		expect(element.html()).toContain('<a ng-href="#/person/{{href  | urlcustomencode }}" class="ng-binding">{{linkText}}</a>');
    	});

 	});
*/
});
