define(['knockout', 'dataContext'], function (ko, dataContext) {

    var viewModel = {
        tasks: ko.observableArray(),

        activate: activate
    };

    return viewModel;


    function activate() {
        var tasks = dataContext.getCollection();

        viewModel.tasks(tasks);
    }
})