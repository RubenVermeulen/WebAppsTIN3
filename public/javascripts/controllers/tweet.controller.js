angular.module('webApps').controller('TweetController',
    function(posts, Flash) {
        var vm = this;

        vm.tweet = tweet;

        function tweet() {
            if (vm.post === undefined || vm.post.body === undefined) {
                Flash.create('danger', '<strong>Danger!</strong> You can\'t tweet something which isn\'t there.');
                return false;
            }

            posts.create(vm.post).error(function() {
                Flash.create('danger', '<strong>Danger!</strong> All fields are required.');
            }).success(function() {
                Flash.create('success', '<strong>Success!</strong> Tweet sent to the Bird Capital. 👌');
            });

            vm.post = {};
        }
    }
);