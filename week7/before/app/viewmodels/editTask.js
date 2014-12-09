define(['knockout', 'dataContext', 'plugins/router'], function (ko, dataContext, router) {

    var self = {
        task: null
    };

    var viewModel = {
        title: ko.observable(),
        description: ko.observable(),
        update: update,

        activate: activate
    };

    return viewModel;

    function update() {
        self.task.title = viewModel.title();
        self.task.description = viewModel.description();

        router.navigate('');
    }

    function activate(id) {
        debugger;
        self.task = dataContext.getById(id);

        if (!self.task) {
            router.navigate('404');
        } else {
            viewModel.title(self.task.title);
            viewModel.description(self.task.description);
        }
    }

})