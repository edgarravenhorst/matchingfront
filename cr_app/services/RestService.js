define(function(require) {

    function RestService( $http, $q ){
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
            //console.log(memberdata);
            var Member = function(){
                this.id = 0;

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

                            return $q.all(promises).then(function(result){
                                return result;
                            });

                        }, function(errordata){
                            return errordata
                        })

                    });
                }
            }

            return new Member();
        }

        this.initRestObject = function(obj){
            var srcObj = obj.src;
            var promises = {};
            obj.id = srcObj.serviceId;

            angular.forEach(srcObj.members, function(member, name) {
                obj[name] = this.initMember(member);
            }.bind(this))

            return obj;
        }

        this.getRestData = function(calls){
            return $q.all(calls).then(function(result){

                var promises = [];
                var services = {}

                angular.forEach(result, function(obj){

                    services[obj.data.serviceId] = {
                        src:obj.data
                    }

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
