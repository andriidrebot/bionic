define(['knockout', 'dataContext', 'userContext'], function (ko, dataContext, userContext) {

    var viewModel = {
        tasks: ko.observableArray(),

        canActivate: canActivate,
        activate: activate
    };

    return viewModel;

    function canActivate() {
        if (userContext.session) {
            return true;
        }

        return { redirect: 'signin' };
    }

    function activate() {
        return dataContext.getCollection().then(function (tasks) {
            viewModel.tasks(tasks);
        });
    }
})