var calculator = {
    add: function (str) {
        if (!str) {
            return 0;
        }

        var str = str.replace('\n', ',');

        var
            splitted = str.split(','),
            value = 0,
            i = 0, len = splitted.length
        ;

        for (; i < len; i++) {
            value += +splitted[i];
        }

        return value;
    }
}