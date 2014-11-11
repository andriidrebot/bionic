$(function () {

    var viewModel = {
        tasks: ko.observableArray(),

        taskToAdd: ko.observable(),
        add: function () {
            viewModel.tasks.push({
                title: ko.observable(viewModel.taskToAdd()),
                isCompleted: ko.observable(false)
            });
            viewModel.taskToAdd('');
        },
        remove: function (task) {
            viewModel.tasks.remove(task);
        },

        hideCompleted: ko.observable(),
        filter: ko.observable()
    }

    viewModel.filteredTasks = ko.computed(function () {
        var
            hideCompleted = viewModel.hideCompleted(),
            filter = viewModel.filter()
        ;

        var result = [];
        viewModel.tasks().forEach(function (task) {
            if (hideCompleted && task.isCompleted()) {
                return;
            }

            if (filter && task.title().indexOf(filter) == -1) {
                return;
            }

            result.push(task);
        });
        return result;
    });

    ko.applyBindings(viewModel);

})