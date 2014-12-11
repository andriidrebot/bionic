define(['knockout', 'plugins/router', 'userContext'], function (ko, router, userContext) {

    var viewModel = {
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
        userContext.signin(viewModel.email(), viewModel.password())
            .then(function () {
                router.navigate('');
            })
            .catch(function () {
                // handle error
            });
    }

})