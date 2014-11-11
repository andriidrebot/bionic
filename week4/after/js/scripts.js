$(function () {

    var viewModel = {
        tasks: ko.observableArray(),

        taskToAdd: ko.observable(),
        add: function () {
            viewModel.tasks.push({
                title: viewModel.taskToAdd(),
                isCompleted: ko.observable(false)
            });
            viewModel.taskToAdd('');
        },
        remove: function (task) {
            viewModel.tasks.remove(task);
        },

        hideCompleted: ko.observable()
    }

    viewModel.filteredTasks = ko.computed(function () {
        var hideCompleted = viewModel.hideCompleted();

        if (!hideCompleted) {
            return viewModel.tasks();
        }

        var result = [];

        viewModel.tasks().forEach(function (task) {
            if (task.isCompleted()) {
                return;
            }

            result.push(task);
        });

        return result;
    });

    ko.applyBindings(viewModel);

})