$(function () {

    var viewModel = {
        title: 'The Team',
        personToAdd: personViewModel(),
        people: ko.observableArray([]),
        add: add,
        remove: remove
    };

    function add() {
        var obj = personViewModel(viewModel.personToAdd.firstname(), viewModel.personToAdd.lastname());
        viewModel.people.push(obj);
        viewModel.personToAdd.firstname('');
        viewModel.personToAdd.lastname('');
    }

    function remove(obj) {
        viewModel.people.remove(obj);
    }

    viewModel.people.push(personViewModel('Andrey', 'Drebot'));
    viewModel.people.push(personViewModel('Ivan', 'Ivanov'));

    function personViewModel(fn, ln) {
        return {
            firstname: ko.observable(fn),
            lastname: ko.observable(ln)
        };
    }

    setTimeout(function () {
        viewModel.people.push(personViewModel('Petr', 'Petrov'));
    }, 3000);

    ko.applyBindings(viewModel);
})