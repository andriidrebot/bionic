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

        dataContext.update(self.task).then(function () {
            router.replace('');
        });
        
    }

    function activate(id) {
        return dataContext.getById(id).then(function (task) {
            self.task = task;
            viewModel.title(task.title);
            viewModel.description(task.description);
        }).catch(function () {
            router.navigate('404');
        })
    }

})