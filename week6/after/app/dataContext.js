define([], function () {

    var self = {
        tasks: [{
            id: '0',
            title: 'Task 1',
            description: 'Task 1 description'
        }]
    };

    return {
        add: add,

        getById: getById,
        getCollection: getCollection
    }

    function add(task) {
        task.id = task.id || self.tasks.length;
        self.tasks.push(task);
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

})