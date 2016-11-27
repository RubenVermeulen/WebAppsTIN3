angular.module('webApps').controller('UsersController',
    function($state, auth, users, posts, Flash, md5) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.user = users.user;
        vm.users = users.users;
        vm.posts = posts.posts;

        vm.create = create;
        vm.subscribe = subscribe;
        vm.unsubscribe = unsubscribe;
        vm.isSubscribed = isSubscribed;
        vm.gravatar = gravatar;
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.hasUpvoted = hasUpvoted;

        function create() {
            posts.create(vm.post).error(function() {
                Flash.create('danger', '<strong>Danger!</strong> All fields are required.');
            }).then(function() {
                Flash.create('success', '<strong>Success!</strong> Tweet sent to the Bird Capital.');
            });

            vm.post = {};
        }

        function subscribe(user) {
            users.subscribe({userId: user._id}).error(function() {
                Flash.create('danger', '<strong>Danger!</strong> Could not follow ' + user.firstName + ' ' + user.lastName + '.');
            }).then(function() {
                user.followers.push(auth.currentUser()._id);
            });
        }

        function unsubscribe(user) {
            users.unsubscribe({userId: user._id}).error(function() {
                Flash.create('danger', '<strong>Danger!</strong> Could not unfollow ' + user.firstName + ' ' + user.lastName + '.');
            }).then(function() {
                var index = user.followers.indexOf(auth.currentUser()._id);
                user.followers.splice(index, 1);
            });
        }

        function isSubscribed(user) {
            return user.followers.indexOf(auth.currentUser()._id) !== -1;
        }

        function gravatar(email, size) {
            return 'https://www.gravatar.com/avatar/' + md5.createHash(email) + '?s=' + size + '&d=retro';
        }

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