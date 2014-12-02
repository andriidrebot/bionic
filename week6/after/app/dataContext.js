define([], function () {

    var self = {
        tasks: []
    };

    return {
        add: add,

        getCollection: getCollection
    }

    function add(task) {
        self.tasks.push(task);
    }

    function getCollection() {
        return self.tasks;
    }

})