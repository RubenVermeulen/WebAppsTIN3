angular.module('webApps').controller('UsersController',
    function($state, auth, users, Flash, md5) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.user = users.user;
        vm.users = users.users;

        vm.subscribe = subscribe;
        vm.unsubscribe = unsubscribe;
        vm.isSubscribed = isSubscribed;
        vm.gravatar = gravatar;

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
    }
);