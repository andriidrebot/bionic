$(function () {

    var viewModel = {
        tasks: ko.observableArray(),

        taskToAdd: ko.observable(),
        add: function () {
            viewModel.tasks.push({
                title: viewModel.taskToAdd()
            });
            viewModel.taskToAdd('');
        },
        remove: function (task) {
            viewModel.tasks.remove(task);
        }
    }

    ko.applyBindings(viewModel);

})