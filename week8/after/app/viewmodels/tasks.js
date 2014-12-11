define(['knockout', 'dataContext'], function (ko, dataContext) {

    var viewModel = {
        tasks: ko.observableArray(),

        activate: activate
    };

    return viewModel;


    function activate() {
        return dataContext.getCollection().then(function (tasks) {
            viewModel.tasks(tasks);
        });
    }
})