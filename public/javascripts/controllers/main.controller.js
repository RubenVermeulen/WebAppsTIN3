angular.module('webApps').controller('MainController',
    function($state, auth, posts, md5) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.post = {};
        vm.posts = posts.posts;
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.hasUpvoted = hasUpvoted;
        vm.gravatar = gravatar;

        function upvote(post) {
            posts.upvote(post);
        }

        function downvote(post) {
            posts.downvote(post);
        }

        function hasUpvoted(post) {
            return post.upvotes.indexOf(auth.currentUser()._id) !== -1;
        }

        function gravatar(email, size) {
            return 'https://www.gravatar.com/avatar/' + md5.createHash(email) + '?s=' + size + '&d=retro';
        }
    }
);