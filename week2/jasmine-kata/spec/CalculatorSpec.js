describe('Calculator', function () {

    it('should be defined', function () {
        expect(calculator).toBeDefined();
    })

    describe('add:', function () {

        it('should be function', function () {
            expect(calculator.add).toEqual(jasmine.any(Function));
        });

        describe('when input string is undefined', function () {

            it('should return 0', function () {
                expect(calculator.add()).toEqual(0);
            })

        })

        describe('when input is an empty string', function () {

            it('should return 0', function () {
                expect(calculator.add('')).toEqual(0);
            });

        });

        describe('when input is a single number', function () {

            it('should return this number', function () {
                expect(calculator.add('5')).toEqual(5);
            })

        });

        describe('when input has two numbers divided by ,', function () {

            it('should return sum of these numbers', function () {
                expect(calculator.add('4,5')).toEqual(9);
            })
        })

        describe('when input has three numbers divided by ,', function () {

            it('should return sum of these numbers', function () {
                expect(calculator.add('4,5,1')).toEqual(10);
            })

        })

        describe('when input has three numbers divided by , and \n', function () {

            it('should return sum of these numbers', function () {
                expect(calculator.add('4,5\n1')).toEqual(10);
            })

        })
        
    })

})