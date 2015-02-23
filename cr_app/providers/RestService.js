
define(function (require) {
    'use strict';

    function RestService($http, $q) {
        var service = this;
        this.$inject =  ['$http', '$q'];

        this.RestURL = 'http://xtalus.apps.gedge.nl/simple/restful/services/info.matchingservice.dom.Api.api/';

        this.Initialize = function () {
            return $http.get(this.RestURL).then(function (result) {
                //console.log(result)
                var promises = {};

                angular.forEach(result, function (obj, i) {
                    promises[i] = (this.initRestObject(obj));
                }.bind(this));

                return $q.all(promises).then(function(result){return result.data});

            }.bind(this));
        };

        this.initRestMember = function (memberdata) {
            var Collection, collection,
                Action, action;

            Collection = function () {

                this.collect = function (params) {
                    return $http.get(memberdata.links[0].href).then(function (obj) {
                        return service.initRestMember(obj.data);
                    }, service.logError);;
                };

            };

            Action = function () {

                this.method = 'GET'

                this.call = function (params) {

                    return $http({
                        method: memberdata.links[0].method,
                        url: memberdata.links[0].href,
                        cache: false
                    }).then(function(result){
                        return $http({
                            method: result.data.links[2].method,
                            url: result.data.links[2].href,
                            cache: false,
                            params: params
                        })
                    })
                    .then(function (obj) {
                        var promises = {};

                        angular.forEach(obj.data.result.value, function (value, i) {
                            promises[i] = $http.get(value.href);
                        });

                        return $q.all(promises).then(function (results) {
                            if (!results[0]) return 'action success';
                            if (!results[1]) return service.initRestObject(results[0].data)

                            var list = []

                            angular.forEach(results, function(result, i){
                                list.push(service.initRestObject(result.data))
                            })

                            return list;
                        });

                    }, service.logError)
                };

            };

            if (memberdata.memberType === 'property')
                return memberdata.value;

            if (memberdata.memberType === 'action') {
                action = new Action();
                return action.call;
            }

            if (memberdata.memberType === 'collection') {
                collection = new Collection();
                //console.log( memberdata.value)
                if (memberdata.value) return memberdata.value;
                else return collection.collect;
            }
        };

        this.initRestObject = function (restObj) {
            var obj = {},
                promises = {};

            obj.restObj = restObj;

            angular.forEach(restObj.members, function (member, name) {
                obj[name] = this.initRestMember(member);
            }.bind(this));

            return obj;
        };

        this.getRestData = function (calls) {
            return $q.all(calls).then(function (result) {
                var promises = [],
                    services = {};

                angular.forEach(result, function (obj) {
                    services[obj.data.serviceId] = obj.data;
                });

                return services;
            }, service.logError);
        };

        this.logError = function (error) {
            console.log('status: ' + error.status + ' | ' + error.statusText + '\n message: ' + error.data['x-ro-invalidReason'], error);
            return error;
        };

    }
    return RestService;
});
