angular.module('webApps').controller('MainController',
    function($state, auth, posts, md5, Flash) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.post = posts.post;
        vm.posts = posts.posts;
        vm.upvote = upvote;
        vm.upvoteComment = upvoteComment;
        vm.downvoteComment = downvoteComment;
        vm.downvote = downvote;
        vm.hasUpvoted = hasUpvoted;
        vm.hasUpvotedComment = hasUpvotedComment;
        vm.gravatar = gravatar;
        vm.comment = comment;

        function upvote(post) {
            posts.upvote(post);
        }

        function downvote(post) {
            posts.downvote(post);
        }

        function upvoteComment(post, comment) {
            posts.upvoteComment(post, comment);
        }

        function downvoteComment(post, comment) {
            posts.downvoteComment(post, comment);
        }

        function hasUpvoted(post) {
            return post.upvotes.indexOf(auth.currentUser()._id) !== -1;
        }

        function hasUpvotedComment(comment) {
            return comment.upvotes.indexOf(auth.currentUser()._id) !== -1;
        }

        function gravatar(email, size) {
            return 'https://www.gravatar.com/avatar/' + md5.createHash(email) + '?s=' + size + '&d=retro';
        }

        function comment(post) {
            if (vm.postComment === undefined || vm.postComment.body === undefined) {
                Flash.create('danger', '<strong>Danger!</strong> You can\'t tweet something which isn\'t there.');
                return false;
            }

            posts.createComment(post, vm.postComment).error(function() {
                Flash.create('danger', '<strong>Danger!</strong> All fields are required.');
            }).success(function(data) {
                console.log(data);
                Flash.create('success', '<strong>Success!</strong> Tweet sent to the Bird Capital. 👌');
            });

            vm.postComment = {};
        }
    }
);