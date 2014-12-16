define(['knockout', 'userContext', 'plugins/router'], function (ko, userContext, router) {

    var viewModel = {
        fullname: ko.observable(),
        email: ko.observable(),
        password: ko.observable(),

        submit: submit,
        canActivate: canActivate
    }

    return viewModel;

    function canActivate() {
        if (userContext.session) {
            return { redirect: '' };
        }

        return true;
    }

    function submit() {
        userContext.signup(viewModel.fullname(), viewModel.email(), viewModel.password())
            .then(function () {
                router.navigate('');
            })
            .catch(function () {
                // handle error
            })
    }

})