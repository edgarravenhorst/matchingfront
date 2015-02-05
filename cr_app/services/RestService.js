define(function(require) {

    function RestService( $http, $q ){
        this.$inject =  ['$http', '$q']

        this.baseURL = 'http://xtalus.apps.gedge.nl/simple/restful/';
        this.servicesURL = this.baseURL + 'services/'

        this.getServices = function(selectedServices){
            calls = [];

            angular.forEach(selectedServices, function(serviceName) {
                calls.push($http.get(this.servicesURL + serviceName))
            }.bind(this))

            return this.getRestData(calls)
            .then(function(result) {

                var promises = {}

                angular.forEach(result, function(obj, i){
                    promises[i] = (this.initRestObject(obj))
                }.bind(this))

                return $q.all(promises).then(function(result){
                    return result;
                });
            }.bind(this))
        }

        this.initMember = function(memberdata){
            var initMember = this.initMember;
            var Member = function(){
                this.id = 0;
                this.rawdata = memberdata;
                this.post = function (params){
                    return $http.get(memberdata.links[0].href).then(function(result){

                        //if(result.data.links[2].method)
                        return $http({
                            method: 'POST',
                            url: result.data.links[2].href,
                            cache: false,
                            params: params
                        }).then(function(obj){

                             var promises = {}

                            angular.forEach(obj.data.result.value, function(value, i){
                                promises[i] = $http.get(value.href)
                            }.bind(this))

                            return $q.all(promises);

                        }, function(errordata){
                            return errordata
                        })

                    });
                }

                this.get = function(params){
                    return $http.get(memberdata.links[0].href).then(function(result){

                        //if(result.data.links[2].method)
                        return $http({
                            method: 'GET',
                            url: result.data.links[0].href,
                            cache: false,
                            params: params
                        }).then(function(obj){

                            var promises = {}

                            //console.log(initMember(obj.data));

                            /*angular.forEach(obj.data.result.value, function(value, i){
                                promises[i] = $http.get(value.href)
                            }.bind(this))*/


                            member = initMember(obj.data);
                            console.log(member);
                            member.appel = obj.data;

                            return initMember(obj.data);

                        }.bind(this), function(errordata){
                            return errordata
                        })

                    });
                }
            }
            console.log(memberdata)
            if (memberdata.memberType == 'property') return memberdata.value
            return new Member();
        }

        this.initRestObject = function(restObj){
            var obj = {}
            var promises = {};

            obj.restObj = restObj
            //restObj.id = srcObj.serviceId;

            angular.forEach(restObj.members, function(member, name) {
                obj[name] = this.initMember(member);
            }.bind(this))

            return obj;
        }

        this.getRestData = function(calls){
            return $q.all(calls).then(function(result){

                var promises = [];
                var services = {}

                angular.forEach(result, function(obj){

                    services[obj.data.serviceId] = obj.data

                })

                return services;

            }, function(error){
                console.log('error: ')
                console.log(error)
            })
        }
    };
    return RestService;
});
