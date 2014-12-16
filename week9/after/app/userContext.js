define(['Q', 'plugins/http'], function (Q, http) {

    var userContext = {
        signin: signin,
        signup: signup,

        session: null
    }

    return userContext;

    function signup(fullname, email, password) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/users/';
        var headers = {
            "X-Parse-Application-Id": "XrRQeum17tU7ogr7AJS1pt171EjiyuujXZyNlhZs",
            "X-Parse-REST-API-Key": "csLhjXRBqx6K1vr0NGSaehrQryzER38zLgh09wvu"
        }

        var user = {
            fullname: fullname,
            username: email,
            password: password
        };

        http.post(url, user, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function signin(email, password) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/login/';
        var headers = {
            "X-Parse-Application-Id": "XrRQeum17tU7ogr7AJS1pt171EjiyuujXZyNlhZs",
            "X-Parse-REST-API-Key": "csLhjXRBqx6K1vr0NGSaehrQryzER38zLgh09wvu"
        }

        var user = {
            username: email,
            password: password
        };

        http.get(url, user, headers)
            .done(function (response) {
                if (response) {
                    userContext.session = response;
                    dfd.resolve();
                } else {
                    dfd.reject();
                }
                
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

});