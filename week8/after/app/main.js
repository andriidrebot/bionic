requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'Q': '../lib/q/q'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    },
    urlArgs: 'v=' + Math.random()
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'dataContext'], function (system, app, viewLocator, dataContext) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function () {
        viewLocator.useConvention();

        dataContext.initialize()
            .then(function () {
                app.setRoot('viewmodels/shell', 'entrance');
            })
            .catch(function (e) {
                console.warn(e);
            })
    });
});