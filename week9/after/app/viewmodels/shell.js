define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title: 'Tasks', moduleId: 'viewmodels/tasks' },
                { route: 'createTask', title: 'Create new task', moduleId: 'viewmodels/createTask' },
                { route: 'task/:id', title: 'Create new task', moduleId: 'viewmodels/editTask' },

                { route: 'signin', title: 'Sign in', moduleId: 'viewmodels/signin' },
                { route: 'signup', title: 'Sign up', moduleId: 'viewmodels/signup' },
                { route: '404', title: '404', moduleId: 'viewmodels/404' }
            ]);

            return router.activate();
        }
    };
});