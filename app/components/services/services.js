'use strict';

/* Services */

/*Voor REST API nodig:

- een 'beginpunt' (ws een service)
- daarna: een service die een volledige URL neemt, een methode en params bijv bij POST
- handig als data 'plat wordt aangeboden' op angular $scope

*/

var overallServices = angular.module('overallServices', []);

overallServices.factory('Flatten', [
	function(){	
		return function(target, opts){
			
			
			opts = opts || {};
			
			var delimiter = opts.delimiter || '_';
  			var output = {};
  			
  			function step(object, prev) {
  			// body
  			    Object.keys(object).forEach(function(key) {
      				var value = object[key];
      				var isarray = opts.safe && Array.isArray(value);
      				var type = Object.prototype.toString.call(value);
      				var isobject = (
        				type === "[object Object]" ||
        				type === "[object Array]"
      				);

      				var newKey = prev
        				? prev + delimiter + key
        				: key;

      				if (!isarray && isobject) {
        				return step(value, newKey);
      				}

      				output[newKey] = value;
    			})
  			
			// end body
  			}
		
			step(target);
			
			
			return output;
			
			
			// to test
/* 			return 'target: ' + target + ' - opts: ' + opts; */
		};
}]);    


var matchingServices = angular.module('matchingServices', ['ngResource', 'overallServices']);

/* Voor test doeleinden zonder authentificatie */
/*
var pass = 'ZnJhbnM6cGFzcw=='; //user: frans - ww: pass

matchingServices.run(function($http) {
  $http.defaults.headers.common.Authorization = 'Basic ' + pass
});

matchingServices.run(function($http) {
  $http.defaults.headers.post.Authorization = 'Basic ' + pass
});
*/

matchingServices.factory('Root', ['$resource', '$http',
  function($resource, $http){
    return $resource('http://xtalus.apps.gedge.nl/simple/restful/:step',
    	{step : '@step'}
    );
  }]);
  
matchingServices.factory('ThisIsYou', ['$resource',
  function($resource){
    var result = $resource('http://xtalus.apps.gedge.nl/simple/restful/services/:step/actions/thisIsYou/invoke',
    {
    	step: '@Persons'
    },
    {
    	invoke : {method: 'POST'}
    }
    );
    return result;
    
  }]);
  
matchingServices.factory('MatchingObjects', ['$resource',
	function($resource){
		
		var result = $resource('http://xtalus.apps.gedge.nl/simple/restful/objects/:domainType/:instanceId',
		{
			domainType: '@domainType',
			instanceId: '@instanceId' 
		}	
		);
		
		return result;
}]);

  
matchingServices.run(
	['$templateCache', function ( $templateCache ) {
   	 	$templateCache.removeAll(); 
}]);
   	
matchingServices.factory('MatchingAllServices', ['Restangular', 'Flatten',
	function(Restangular, Flatten){
		var restAngular = Restangular.withConfig(
			function(Configurer){
				Configurer.setBaseUrl('http://xtalus.apps.gedge.nl/simple/restful');
				// Make the returned objects 'flat'
				Configurer.setResponseInterceptor(
					function(data){
						data = Flatten(data);
						return data;
				});
				// Make unrestangularized element also available
				// See: https://github.com/mgonto/restangular#how-can-i-access-the-unrestangularized-element-as-well-as-the-restangularized-one
				Configurer.setResponseExtractor(function(response) {
  					var newResponse = response;
  					
  					if (angular.isArray(response)) {
    					angular.forEach(newResponse, function(value, key) {
      					newResponse[key].originalElement = angular.copy(value);
    				});
  					} else {
    					newResponse.originalElement = angular.copy(response);
  					}
  					return newResponse;
				});
			}
		);	
		
		var _matchingService1 = restAngular.one('services');
		var _matchingService2 = restAngular.one('services/Persons/actions/thisIsYou/invoke');
		var _matchingService3 = restAngular.one('services/Persons/actions/allPersons/invoke');
				
		return {
			getServices1: function(){
				return _matchingService1.get();
			},
			getServices2: function(){
				return _matchingService2.post();
			},
			getServices3: function(){
				return _matchingService3.post();
			}
		}
}]);

matchingServices.factory("messageService", ['$q', function($q){
    return {
        getMessage: function(){
            return $q.when("Hello World!");
        }
    };
}]);

matchingServices.factory('MatchingRestangular', ['Restangular', 'Flatten',
	function(Restangular, Flatten){
		var restAngular = Restangular.withConfig(
			function(Configurer){
				Configurer.setBaseUrl('http://xtalus.apps.gedge.nl/simple/restful/');
			}
		);	
		
		var _matchingOnePersonService = function(id){return restAngular.one('objects/info.matchingservice.dom.Actor.Person', id)};
		var _matchingOneActorService = function(actor, id){return restAngular.one('objects/info.matchingservice.dom.Actor.' + actor, id)};
				
		return {
			getOnePerson: function(id){
				return _matchingOnePersonService(id).get();
			},
			getFirstName: function(id){
				return _matchingOnePersonService(id).customGET('properties/firstName');
			},
			getOnePersonProperty: function(id, property){
				return _matchingOnePersonService(id).customGET('properties/' + property);
			},
			getOneActorProperty: function(actor, id, property){
				return _matchingOneActorService(actor, id).customGET('properties/' + property);
			}
		}
}]);

matchingServices.factory('MatchingRestangularFlat', ['Restangular', 'Flatten', '$q',
	function(Restangular, Flatten, $q){

			
			var restAngular = Restangular.withConfig(
				function(Configurer){
					Configurer.setBaseUrl('http://xtalus.apps.gedge.nl/simple/restful/');
					// Make the returned objects 'flat'
					Configurer.setResponseInterceptor(
						function(data){
							data = Flatten(data);
							return data;
					});
				}
			);	
			
			var _matchingOneActorService = function(actor, id){return restAngular.one('objects/info.matchingservice.dom.Actor.' + actor, id)};
					
			return {
				getOneActorProperty: function(actor, id, property){
					return _matchingOneActorService(actor, id).customGET('properties/' + property);
				}
			}
			

}]);


matchingServices.factory('MatchingRestangularFlatDefer', ['Restangular', 'Flatten', '$q',
	function(Restangular, Flatten, $q){

			var defer = $q.defer();
			var defer2 = $q.defer();

			
			var restAngular = Restangular.withConfig(
				function(Configurer){
					Configurer.setBaseUrl('http://xtalus.apps.gedge.nl/simple/restful/');
					// Make the returned objects 'flat'
					Configurer.setResponseInterceptor(
						function(data){
							data = Flatten(data);
							return data;
					});
				}
			);	
			
			var _matchingOneActorService = function(actor, id){return restAngular.one('objects/info.matchingservice.dom.Actor.' + actor, id)};
			var _matchingActorType = function(){return restAngular.one('domain-types/info.matchingservice.dom.Actor.Person')}
					
			return {
				getOneActorProperty: function(actor, id, property){
					defer.resolve(_matchingOneActorService(actor, id).customGET('properties/' + property)); 
					return defer.promise;
				},
				getType: function(){
					defer2.resolve(_matchingActorType().customGET());
					return defer2.promise;
				}
			}
			
}]);

matchingServices.factory('MatchingRestangularDefer', ['Restangular', 'Flatten', '$q',
	function(Restangular, Flatten, $q){
			// make use of $q to create promise
			var defer = $q.defer();
			var defer2 = $q.defer();
			var defer3 = $q.defer();
			
			var restAngular = Restangular.withConfig(
				function(Configurer){
					Configurer.setBaseUrl('http://xtalus.apps.gedge.nl/simple/restful/');
				}
			);	
			
			var _matchingServices = function(){return restAngular.one('services')}
			var _matchingVraagstukken = function(){return restAngular.one('services/Profiles/actions/allDemandProfilesOfType/')}
			var _matchingThisIsYou = function(){return restAngular.one('services/Persons/actions/thisIsYou/')}
					
			return {
				getAllServices: function(){
					// when rectangular resolves, resolve the promise
					// in this case we can access a property of the returned rectangular object directly
					_matchingServices().customGET().then(
						function(data){
							defer.resolve(data.value);
						}
					);
					
					// return the promise
					return defer.promise;
				},
				thisIsYou: function(){
					_matchingThisIsYou().post('invoke',{}).then(
						function(data){
							defer3.resolve(data.result.value[0]);
						}
					);
					
					return defer3.promise;
				},
				
			}
			
}]);

matchingServices.factory('RestObjectServiceFlat', ['$http', 'Flatten', '$q',
	function($http, Flatten, $q){
		var restObject = function(url){
			var defer=$q.defer();
			$http({
				method: 'GET',
				url: url,
				cache: false
			})
			.success(function(data) {
				defer.resolve(Flatten(data.members));
			})
			.error(function(reason){
				defer.reject(reason);
			})
			
			return defer.promise;
		}
		return {restObject: restObject};			
}]);

matchingServices.factory('RestObjectService', ['$http', 'Flatten', '$q',
	function($http, Flatten, $q){
		var restObject = function(url){
			var defer=$q.defer();
			$http({
				method: 'GET',
				url: url,
				cache: false
			})
			.success(function(data) {
				defer.resolve(data.members);
			})
			.error(function(reason){
				defer.reject(reason);
			})
			
			return defer.promise;
		}
		return {restObject: restObject};			
}]);
