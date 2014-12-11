define(['Q', 'durandal/system'], function (Q, system) {

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

        var db = storage.db;
        var trans = db.transaction(["tasks"], "readwrite");
        var store = trans.objectStore("tasks");

        var id = system.guid()

        var request = store.put({
            "id": id,
            "title": task.title,
            "description": task.description
        });

        request.onsuccess = function (e) {
            dfd.resolve(id);
        };

        request.onerror = function (e) {
            dfd.reject(e);
        };

        return dfd.promise;
    }

    function update(task) {
        var dfd = Q.defer();

        var db = storage.db;
        var trans = db.transaction(["tasks"], "readwrite");
        var store = trans.objectStore("tasks");

        var request = store.put({
            "id": task.id,
            "title": task.title,
            "description": task.description
        });

        request.onsuccess = function (e) {
            dfd.resolve();
        };

        request.onerror = function (e) {
            dfd.reject(e);
        };

        return dfd.promise;
    }

    function getById(id) {
        var dfd = Q.defer();

        var db = storage.db;
        var trans = db.transaction(["tasks"], "readwrite");
        var store = trans.objectStore("tasks");

        var keyRange = IDBKeyRange.only(id);
        var cursorRequest = store.openCursor(keyRange);

        cursorRequest.onsuccess = function (e) {
            var result = e.target.result;
            if (!!result == false) {
                dfd.reject();
                return;
            }

            dfd.resolve(result.value);
        };

        cursorRequest.onerror = function () {
            dfd.reject();
        };

        return dfd.promise;
    }

    function getCollection() {
        var dfd = Q.defer();

        var db = storage.db;
        var trans = db.transaction(["tasks"], "readwrite");
        var store = trans.objectStore("tasks");

        var collection = [];

        var cursorRequest = store.openCursor();
        cursorRequest.onsuccess = function (e) {
            var result = e.target.result;
            if (!!result == false) {
                dfd.resolve(collection);
                return;
            }


            collection.push(result.value);
            result.continue();
        };

        cursorRequest.onerror = function (e) {
            dfd.reject(e);
        };

        return dfd.promise;
    }

})