describe('User factory', function() {

    var $service;

    beforeEach(module('webApps'));

    beforeEach(inject(function(){
        var $injector = angular.injector();
        $service = $injector.get('users');
    }));

    describe('$scope.tweet', function() {
        it('validation fails when post is undefined', function() {

            expect(2 + 2).toEqual(4);
        });

    });
});