define(['knockout', 'dataContext', 'plugins/router'], function (ko, dataContext, router) {

    var viewModel = {
        title: ko.observable(),
        description: ko.observable(),

        create: create,


        deactivate: deactivate
    };

    return viewModel;

    function create() {
        dataContext.add({
            title: viewModel.title(),
            description: viewModel.description()
        })
        router.navigate('');
    }

    function deactivate() {
        viewModel.title('');
        viewModel.description('');
    }
})