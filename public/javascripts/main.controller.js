angular.module('webApps').controller('MainController',
    function($state, auth, posts) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.post = {};
        vm.posts = posts.posts;
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.hasUpvoted = hasUpvoted;

        function upvote(post) {
            posts.upvote(post);
        }

        function downvote(post) {
            posts.downvote(post);
        }

        function hasUpvoted(post) {
            return post.upvotes.indexOf(auth.currentUser()._id) !== -1;
        }
    }
);