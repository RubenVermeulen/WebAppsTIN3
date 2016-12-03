angular.module('webApps').controller('TweetController',
    function(posts, Flash) {
        var vm = this;

        vm.tweet = tweet;

        function tweet() {
            posts.create(vm.post).error(function() {
                Flash.create('danger', '<strong>Danger!</strong> All fields are required.');
            }).success(function() {
                Flash.create('success', '<strong>Success!</strong> Tweet sent to the Bird Capital. 👌');
            });

            vm.post = {};
        }
    }
);