define(['viewmodels/welcome'], function (ViewModel) {

    describe('viewmodel [welcome]', function () {

        describe('displayName:', function () {

            it('should be define', function () {
                var viewModel = new ViewModel();
                expect(viewModel.displayName).toBeDefined();
            });

        })

    })


})