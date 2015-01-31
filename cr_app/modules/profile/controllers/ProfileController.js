'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope',
	'GetRestObject',
	'RestObjectService',
	'RestCollectionService',
	'RestPostService',
	'FormatRestObjectService',
	'GetRestCollection',
	'ThisIsYouUrl',
	'$q',
	'$location',
	'$rootScope',
    function ($scope, GetRestObject, RestObjectService, RestCollectionService, RestPostService, FormatRestObjectService, GetRestCollection, ThisIsYouUrl, $q, $location, $rootScope) 	{

    	//Pogingen om caching te voorkomen, maar werkt niet goed
    	/*
		$templateCache.remove('/modules/home/views/home.html');
    	$templateCache.removeAll();
		*/
		var homeAllDataForRender = function(){
			return(
				ThisIsYouUrl.then(
					function(YourUrl){
						var _thisIsYouUrl = YourUrl;
						return GetRestObject.restObject(_thisIsYouUrl);
					}
				).then(
					function(persondata){
						//for test: json object
						$scope.test =  persondata;
						//dynamic: json list of objects
						$scope.allOfTypeProperty = persondata.allOfTypeProperty;
						$scope.allOfTypeCollection = persondata.allOfTypeCollection;
						$scope.allOfTypeAction = persondata.allOfTypeAction;
						//static: json objects
						$scope.firstName = persondata.allOfTypePropertyObject.firstName;
						$scope.middleName = persondata.allOfTypePropertyObject.middleName;
						$scope.lastName = persondata.allOfTypePropertyObject.lastName;
						$scope.uniqueActorId = persondata.allOfTypePropertyObject.uniqueActorId;
						$scope.roles = persondata.allOfTypePropertyObject.roles;

						$scope.deleteRoleStudent = persondata.allOfTypeActionObject.deleteRoleStudent;
						$scope.addRoleStudent = persondata.allOfTypeActionObject.addRoleStudent;
						$scope.deleteRoleProfessional = persondata.allOfTypeActionObject.deleteRoleProfessional;
						$scope.addRoleProfessional = persondata.allOfTypeActionObject.addRoleProfessional;
						$scope.deleteRolePrincipal = persondata.allOfTypeActionObject.deleteRolePrincipal;
						$scope.addRolePrincipal = persondata.allOfTypeActionObject.addRolePrincipal;
						$scope.newPersonsDemand = persondata.allOfTypeActionObject.newPersonsDemand;

						$scope.myDemands=persondata.allOfTypeCollectionObject.myDemands;
						return GetRestCollection.restObject(persondata.allOfTypeCollectionObject.myDemands);
					}
				).then(
					function(collectiondata){
						$scope.myDemandsObject = collectiondata.collectionList;
						var _promises = [];
						angular.forEach(collectiondata.collectionList, function(value, key){
		/* 					_promises.push(RestObjectService.restObject(value.href)); */
							var _tempObj={};
							RestCollectionService.restObject(value.href + '/collections/demandProfiles').then(
								function(data){
									_tempObj['title']=value.title;
									_tempObj['href']=value.href;
									_tempObj['data']=data;
								}
							);
/* 							_promises.push(RestCollectionService.restObject(value.href + '/collections/demandProfiles')); //direct stap dieper */
							_promises.push(_tempObj);
						});
						return $q.all(_promises);
					}
				).then(
					function(promises){
						var _output = [];
						angular.forEach(promises, function(value, key){
		/* 					_output.push(FormatRestObjectService.allOfTypeCollectionObject(value)); */
							_output.push(value);
						});
						$scope.demands = _output;
					}
				)
			);
		}

		// data for rendering
		homeAllDataForRender();

		//navigation
		$scope.goNext = function ( path ) {
  			$location.path( path );
		};

		//posting
		$scope.postLink = function (url, param) {
			RestPostService.restObject(url, param).then(
				function(data){
					location.reload();
				}
			);
		};

		//input voor nieuwe opdracht
		$scope.opdracht ={};
		$scope.postOpdracht = function (url, param) {
			RestPostService.restObject(url, param).then(
				function(data){
					location.reload();
				}
			);
		};

		//post voor nieuw profiel
		// matching_href is var op rootScope waarmee links worden doorgegeven
		$scope.newProfiel = function (demand_href) {
			$rootScope.matching_href = demand_href;
			$location.path( '/profile/new' );
		}

    }]);
