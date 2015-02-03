define(function(require) {

    function AuthService(Base64, $http, $cookieStore, $rootScope, $timeout){
        var service = {};

        service.Login = function (username, password, callback) {

            /* Use this for real authentication
             ----------------------------------------------*/
            var response = {};
            $http({
                method: 'get',
                url: 'http://xtalus.apps.gedge.nl/simple/restful/user',
                cache: false,
                rnd: Math.random(),   // prevent cache
                headers: {'Authorization': 'Basic ' + Base64.encode(username + ':' + password) }
            })
            .success(function (data) {
                response = { success: username === data.userName };
                callback(response);
            })
            .error(function(){
                response.message = 'Gebruikersnaam of wachtwoord is niet juist';
                callback(response);
            });

        };

        service.SetCredentials = function (username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
    };

    return AuthService;

});
