ko.bindingHandlers.editableText = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        $(element)
            .attr('contenteditable', true)
            .on('blur', function () {
                value($(this).text())
            })
        ;
    },
    update: function (element, valueAccesor) {
        var value = valueAccesor();
        $(element).text(value());
    }
}

ko.bindingHandlers.popover = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        $(element).popover({
            content: value,
        });

        //$(element)
        //    .on('mouseover', function () {
        //        $(element).popover('show');
        //    })
        //    .on('mouseout', function () {
        //        $(element).popover('hide');
        //    })
    }
}

