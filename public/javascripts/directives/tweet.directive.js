angular.module('webApps').directive('tweetForm',
    function() {
        return {
            restrict: 'E',
            transclude: false,
            templateUrl: 'javascripts/directives/tweet-form.html'
        }
    }
);