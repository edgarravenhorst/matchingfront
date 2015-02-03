define(function(require) {

    function RestService( $http, $q ){
        this.baseURL = 'http://xtalus.apps.gedge.nl/simple/restful/';
        this.servicesURL = this.baseURL + 'services/'


        this.getServices = function(selectedServices){
            calls = [];
            angular.forEach(selectedServices, function(serviceName) {
                calls.push($http.get(this.servicesURL + serviceName))
            }.bind(this))

            this.getRestData(calls).then(function(result){
                console.log(result)
            })
        }




        this.getRestLinks = function(links){
            calls = [];

            angular.forEach(links, function(link) {
                if (link.rel != 'self' && link.rel != 'up' && link.method == 'GET' )
                    calls.push($http.get(link.href))
                if (link.method == 'POST' )
                    calls.push($http.post(link.href))
            }.bind(this))

            if (calls.length == 0) return;
            this.getRestData(calls).then(function(result){
                console.log(result)
            })
        }

        this.getRestMembers = function(members){
            calls = [];

            angular.forEach(members, function(member) {
                angular.forEach(member.links, function(link) {
                if (link.rel != 'self' && link.rel != 'up' && link.method == 'GET' )
                    calls.push($http.get(link.href))
                if (link.method == 'POST' )
                    calls.push($http.post(link.href))
            })
            })
            if (calls.length == 0) return;
            this.getRestData(calls).then(function(result){
                console.log(result)
            })
        }

        this.getRestData = function (calls){
            return $q.all(calls).then(function(result){
                var tmp = [];
                angular.forEach(result, function(response) {
                    if (response.data.serviceId)
                        tmp[response.data.serviceId] = response.data;
                    if (response.data.id)
                        tmp[response.data.id] = response.data;
                    this.getRestLinks(response.data.links);
                    this.getRestMembers(response.data.members);
                }.bind(this))
                return tmp;
            }.bind(this), function(error){
                console.log('Error status ' + error.status + ' : ' + error.statusText + ' >> ' + error.data['x-ro-invalidReason'] + '\n')
                console.log(error);
            }).then(function(tmpresult) {
                return tmpresult;
            })
        }
    };

    return RestService;

});
