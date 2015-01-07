'use strict';

angular.module('myApp.demand', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/demand/:demandUrl', {
    templateUrl: 'demand/demand.html',
    controller: 'DemandController'
  });
}])
.controller('DemandController', [
	'$scope', 
	'$routeParams', 
	'urlcustomdecodeFilter', 
	'RestObjectService',
	'FormatRestObjectService',
	'RestCollectionService',
	'GetRestObject', 
	function($scope, $routeParams, urlcustomdecode, RestObjectService, FormatRestObjectService, RestCollectionService, GetRestObject){
		RestObjectService.restObject(urlcustomdecode($routeParams.demandUrl)).then(
			function(data){
				//dynamic
				$scope.allOfTypeProperty = FormatRestObjectService.allOfTypeProperty(data);
				$scope.allOfTypeCollection = FormatRestObjectService.allOfTypeCollection(data);
				$scope.allOfTypeAction = FormatRestObjectService.allOfTypeAction(data);
				//static
				$scope.demandDescription = data.demandDescription.value;
			}	
		);
		RestCollectionService.restObject(urlcustomdecode($routeParams.demandUrl) + '/collections/demandProfiles').then(
			function(data){
				$scope.listOfDemandProfiles = [];
				angular.forEach(data, function(value, key){
					var _detailList = [];
					var _demandDetails = {};
					RestObjectService.restObject(value.href).then(
						function(data){
							var _detail = {};
							/*
_detail.allOfTypeProperty = FormatRestObjectService.allOfTypeProperty(data);
							_detail.allOfTypeCollection = FormatRestObjectService.allOfTypeCollection(data);
							_detail.allOfTypeAction = FormatRestObjectService.allOfTypeAction(data);
*/
							RestCollectionService.restObject(value.href + '/collections/profileElement').then(
								function(data){
/* 									_detail.profileElements = data; */
									var _deeperDetails = [];
									var _detail2 = {};
									angular.forEach(data, function(value, key){
										RestObjectService.restObject(value.href).then(
											function(data){
												_detail2.allOfTypeProperty = FormatRestObjectService.allOfTypeProperty(data);
												_detail2.allOfTypeCollection = FormatRestObjectService.allOfTypeCollection(data);
												_detail2.allOfTypeAction = FormatRestObjectService.allOfTypeAction(data);
												_deeperDetails.push(_detail2);
											}
										);
									});
									_detail.profileElements = _deeperDetails;
								}
							);
							_detailList.push(_detail);
						}
					);
					_demandDetails.title = value.title;
/* 					_demandDetails.href = value.href; */
					_demandDetails.details = _detailList;
					$scope.listOfDemandProfiles.push(_demandDetails);
				});
			}
		);
	}]);
