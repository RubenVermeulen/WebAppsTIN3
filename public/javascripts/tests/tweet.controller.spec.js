describe('Tweet controller', function() {

    var $controller;

    beforeEach(module('webApps'));

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.tweet', function() {
        it('validation fails when post is undefined', function() {
            var $scope = {};
            var controller = $controller('TweetController', {$scope: $scope});

            $scope.post = undefined;
            expect(controller.tweet()).toEqual(false);
        });

        it('validation fails when post.body is undefined', function() {
            var $scope = {};
            var controller = $controller('TweetController', {$scope: $scope});

            $scope.post = {body: undefined};
            expect(controller.tweet()).toEqual(false);
        });
    });
});