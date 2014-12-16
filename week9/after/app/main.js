requirejs.config({
    paths: {
        'text': '../js/text',
        'durandal': '../js/durandal',
        'plugins': '../js/durandal/plugins',
        'transitions': '../js/durandal/transitions',
        'knockout': '../js/knockout-3.1.0',        
        'jquery': '../js/jquery-1.9.1',
        'Q': '../js/q'
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