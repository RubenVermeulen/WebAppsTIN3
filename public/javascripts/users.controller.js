angular.module('webApps').controller('UsersController',
    function($state, auth, users) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.user = {};
        vm.users = users.users;

        vm.subscribe = subscribe;
        vm.unsubscribe = unsubscribe;

        function subscribe(id) {
            users.subscribe({userId: id}).error(function() {
               console.log('Could not subscribe');
            }).then(function() {
                console.log('Subscribed');
            });
        }

        function unsubscribe(id) {
            users.unsubscribe({userId: id}).error(function() {
                console.log('Could not unsubscribe');
            }).then(function() {
                console.log('Unsubscribed');
            });
        }
    }
);