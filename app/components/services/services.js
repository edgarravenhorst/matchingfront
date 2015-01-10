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

matchingServices.factory('RestObjectService', ['$http', '$q',
	function($http, $q){
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

matchingServices.factory('RestCollectionService', ['$http', '$q',
	function($http, $q){
		var restObject = function(url){
			var defer=$q.defer();
			$http({
				method: 'GET',
				url: url,
				cache: false
			})
			.success(function(data) {
				defer.resolve(data.value);
			})
			.error(function(reason){
				defer.reject(reason);
			})
			
			return defer.promise;
		}
		return {restObject: restObject};			
}]);

matchingServices.factory('RestPostService', ['$http', '$q',
	function($http, $q){
		var restObject = function(url, params){
			var defer=$q.defer();
			$http({
				method: 'POST',
				url: url,
				cache: false,
				params: params
			})
			.success(function(data) {
				defer.resolve(data.result);
			})
			.error(function(reason){
				defer.reject(reason);
			})
			
			return defer.promise;
		}
		return {restObject: restObject};			
}]);

matchingServices.factory('FormatRestObjectService', [
	function(){
	
		var _allOfProperty = function(restfulOject){
			var _allOfTypeProperty = [];
			angular.forEach(restfulOject, function(value, key){
				if(value.memberType === 'property'){
					var tmp = {};
					tmp={name : key, value : value.value};
					_allOfTypeProperty.push(tmp);
				}						
			});
			return _allOfTypeProperty;
		}
		
		var _allOfPropertyObject = function(restfulOject){
			var _allOfTypePropertyObject = {};
			angular.forEach(restfulOject, function(value, key){
				if(value.memberType === 'property'){
					_allOfTypePropertyObject[key] = value.value;
				}						
			});
			return _allOfTypePropertyObject;
		}
		
		var _allOfCollection = function(restfulOject){
			var _allOfTypeCollection = [];
			angular.forEach(restfulOject, function(value, key){
				if(value.memberType === 'collection'){
					var tmp = {};
					tmp={name : key, link : value.links[0].href};
					_allOfTypeCollection.push(tmp);
				}							
			});
			return _allOfTypeCollection;
		}

		var _allOfCollectionObject = function(restfulOject){
			var _allOfTypeCollectionObject = {};
			angular.forEach(restfulOject, function(value, key){
				if(value.memberType === 'collection'){
					_allOfTypeCollectionObject[key] = value.links[0].href;
				}						
			});
			return _allOfTypeCollectionObject;
		}
		
		var _allOfAction = function(restfulOject){
			var _allOfTypeAction = [];
			angular.forEach(restfulOject, function(value, key){
				if(value.memberType === 'action'){
					var tmp = {};
					tmp={name : key, link : value.links[0].href + '/invoke'};
					_allOfTypeAction.push(tmp);
				}							
			});
			return _allOfTypeAction;
		}
		
		var _allOfActionObject = function(restfulOject){
			var _allOfTypeActionObject = {};
			angular.forEach(restfulOject, function(value, key){
				if(value.memberType === 'action'){
					_allOfTypeActionObject[key] = value.links[0].href + '/invoke';
				}						
			});
			return _allOfTypeActionObject;
		}						
						
		return {
			allOfTypeProperty: function(restfulOject){
					return _allOfProperty(restfulOject);
				},
			allOfTypePropertyObject: function(restfulOject){
					return _allOfPropertyObject(restfulOject);
				},	
			allOfTypeCollection: function(restfulOject){
					return _allOfCollection(restfulOject);
				},
			allOfTypeCollectionObject: function(restfulOject){
					return _allOfCollectionObject(restfulOject);
				},				
			allOfTypeAction: function(restfulOject){
					return _allOfAction(restfulOject);
				},
			allOfTypeActionObject: function(restfulOject){
					return _allOfActionObject(restfulOject);
				}	
		};
}]);

// Independent from RestAngular
// NOTE: returns the URL right away
matchingServices.factory('ThisIsYouUrl', [
	'$http', 
	'$q',
	function($http, $q){
		var defer=$q.defer();
		var url = 'http://xtalus.apps.gedge.nl/simple/restful/services/Persons/actions/thisIsYou/invoke';
		$http({
			method: 'POST',
			url: url,
			cache: false
			})
			.success(function(data) {
				defer.resolve(data.result.value[0].href);
			})
			.error(function(reason){
				defer.reject(reason);
			})
			
			return defer.promise;

	}
]);

/* uitgebreidere service 
specs: 
	uitsplitsing lijsten met platte objecten van properties, collections en Actions
	returns zowel lists als objecten
*/ 
matchingServices.factory('GetRestObject', [
	'$q', 
	'RestObjectService',
	'RestCollectionService', 
	'FormatRestObjectService',
	function($q, RestObjectService, RestCollectionService, FormatRestObjectService){
		var defer=$q.defer();
		var matchingRestObject = function(url){
			RestObjectService.restObject(url).then(
				function(data){
					defer.resolve(
						{
							allOfTypeProperty : FormatRestObjectService.allOfTypeProperty(data),
							allOfTypePropertyObject : FormatRestObjectService.allOfTypePropertyObject(data),
							allOfTypeCollection : FormatRestObjectService.allOfTypeCollection(data),
							allOfTypeCollectionObject : FormatRestObjectService.allOfTypeCollectionObject(data),
							allOfTypeAction : FormatRestObjectService.allOfTypeAction(data),
							allOfTypeActionObject : FormatRestObjectService.allOfTypeActionObject(data)
						}
					);
				}
			);
			return defer.promise;	
		};
		return {restObject : matchingRestObject}	
	}
]);

matchingServices.factory('GetRestCollection', [
	'$q',
	'RestCollectionService',
	function($q, RestCollectionService){
		var defer=$q.defer();
		var matchingRestCollection = function(url){
			RestCollectionService.restObject(url).then(
				function(data){
					var _tempObject = {};
					var _tempList = [];
					angular.forEach(data, function(value, key){
						_tempObject[value.title]=value.href;
						_tempList.push(value);
					});
					defer.resolve(
						{
							collectionObject : _tempObject,
							collectionList : _tempList
						}
					);
				}
			);
			return defer.promise;	
		};
		return {restObject : matchingRestCollection}			
	}
]);



