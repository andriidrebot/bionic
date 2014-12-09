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
        }).then(function (id) {
            router.navigate('');
        }).catch(function (e) {
            console.error(e);
        });

    }

    function deactivate() {
        viewModel.title('');
        viewModel.description('');
    }
})