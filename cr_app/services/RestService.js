define(function(require) {

    function RestService( $http, $q ){
        this.baseURL = 'http://xtalus.apps.gedge.nl/simple/restful/';
        this.servicesURL = this.baseURL + 'services/'

        this.getService = function(selectedServices){

            urls = [];

            angular.forEach(selectedServices, function(serviceName) {
                urls.push($http.get(this.servicesURL + serviceName))
            }.bind(this))

            $q.all(urls).then(function(result){
                var tmp = [];
                angular.forEach(result, function(response) {
                    tmp.push(response.data);
                })
                return tmp;
            }).then(function(tmpresult) {
                console.log(tmpresult);
            })
        }
    };

    return RestService;

});
