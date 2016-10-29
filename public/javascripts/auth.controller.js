angular.module('webApps').controller('AuthController',
    function($state, auth) {
        var vm = this;

        vm.user = {};
        vm.register = register;
        vm.logIn = logIn;
        vm.changePassword = changePassword;

        function register() {
            auth.register(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('home');
            });
        }

        function logIn() {
            auth.logIn(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('home');
            });
        }

        function changePassword() {
            auth.changePassword(vm.user).error(function(error) {
                vm.error = error;
                vm.success = null;
            }).then(function(success) {
                vm.success = success.data;
                vm.error = null;
                vm.user = {};
            })
        }
    }
);