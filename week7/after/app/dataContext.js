define([], function () {

    var KEY = "TASKMANAGER_LOCALSTORAGE_KEY";

    var self = {
        tasks: []
    };

    try {
        var str = localStorage.getItem(KEY);
        self.tasks = JSON.parse(str) || [];
    } catch (e) {
        self.tasks = [];
    }

    return {
        add: add,
        update: update,

        getById: getById,
        getCollection: getCollection
    }

    function add(task) {
        task.id = task.id || self.tasks.length.toString();
        self.tasks.push(task);

        saveToLocalStorage();
    }

    function update(task) {
        saveToLocalStorage();
    }

    function getById(id) {
        var i = 0;
        for (; i < self.tasks.length; i++) {
            if (self.tasks[i].id === id) {
                return self.tasks[i];
            }
        }
    }

    function getCollection() {
        return self.tasks;
    }

    function saveToLocalStorage() {
        var str = JSON.stringify(self.tasks);
        localStorage.setItem(KEY, str);
    }

})