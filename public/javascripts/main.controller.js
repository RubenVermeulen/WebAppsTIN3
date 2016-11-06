angular.module('webApps').controller('MainController',
    function($state, auth, posts) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.post = {};
        vm.posts = posts.posts;
        vm.createPost = createPost;
        vm.incrementUpvotes = incrementUpvotes;

        function createPost() {
            posts.create(vm.post).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('timeline');
            });
        }

        function incrementUpvotes(post) {
            posts.upvote(post);
        }
    }
);