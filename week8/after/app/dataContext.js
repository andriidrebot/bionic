define(['Q', 'durandal/system', 'plugins/http', 'userContext'], function (Q, system, http, userContext) {

    var storage = {};
    storage.db = null;
    storage.onerror = function () {
        debugger;
    }

    storage.open = function (callback) {
        var version = 1;
        var request = indexedDB.open("tasktracker_v2", version);

        request.onupgradeneeded = function (e) {
            var db = e.target.result;

            e.target.transaction.onerror = storage.onerror;

            if (db.objectStoreNames.contains("tasks")) {
                db.deleteObjectStore("tasks");
            }

            db.createObjectStore("tasks", { keyPath: "id" });
        };

        request.onsuccess = function (e) {
            storage.db = e.target.result;

            callback();
        };

        request.onerror = storage.onerror;
    };

    return {
        initialize: initialize,

        add: add,
        update: update,

        getById: getById,
        getCollection: getCollection
    }

    function initialize() {
        var dfd = Q.defer();

        storage.open(function () {
            dfd.resolve();
        });

        return dfd.promise;
    }

    function add(task) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/tasks/';
        var headers = {
            "X-Parse-Application-Id": "XrRQeum17tU7ogr7AJS1pt171EjiyuujXZyNlhZs",
            "X-Parse-REST-API-Key": "csLhjXRBqx6K1vr0NGSaehrQryzER38zLgh09wvu"
        }

        var data = { title: task.title, description: task.description };

        if (userContext.session) {
            var acl = {};
            acl[userContext.session.objectId] = {
                "read": true,
                "write": true
            };
            data.ACL = acl;
        }

        http.post(url, data, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function update(task) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/tasks/' + task.objectId;
        var headers = {
            "X-Parse-Application-Id": "XrRQeum17tU7ogr7AJS1pt171EjiyuujXZyNlhZs",
            "X-Parse-REST-API-Key": "csLhjXRBqx6K1vr0NGSaehrQryzER38zLgh09wvu"
        }

        http.put(url, { title: task.title, description: task.description }, headers)
            .done(function () {
                dfd.resolve();
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function getById(id) {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/tasks/' + id;
        var headers = {
            "X-Parse-Application-Id": "XrRQeum17tU7ogr7AJS1pt171EjiyuujXZyNlhZs",
            "X-Parse-REST-API-Key": "csLhjXRBqx6K1vr0NGSaehrQryzER38zLgh09wvu"
        }

        if (userContext.session) {
            headers["X-Parse-Session-Token"] = userContext.session.sessionToken;
        }

        http.get(url, {}, headers)
            .done(function (response) {
                if (response) {
                    dfd.resolve(response);
                } else {
                    dfd.reject();
                }
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

    function getCollection() {
        var dfd = Q.defer();

        var url = 'https://api.parse.com/1/classes/tasks/';
        var headers = {
            "X-Parse-Application-Id": "XrRQeum17tU7ogr7AJS1pt171EjiyuujXZyNlhZs",
            "X-Parse-REST-API-Key": "csLhjXRBqx6K1vr0NGSaehrQryzER38zLgh09wvu"
        }

        if (userContext.session) {
            headers["X-Parse-Session-Token"] = userContext.session.sessionToken;
        }

        http.get(url, {}, headers)
            .done(function (response) {
                if (response) {
                    dfd.resolve(response.results || []);
                } else {
                    dfd.reject();
                }
            })
            .fail(function () {
                dfd.reject();
            });

        return dfd.promise;
    }

})