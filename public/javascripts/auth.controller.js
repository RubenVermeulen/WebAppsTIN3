angular.module('webApps').controller('AuthController',
    function($state, auth) {
        var vm = this;

        vm.user = {};
        vm.register = register;
        vm.logIn = logIn;

        function register() {
            auth.register(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('home');
            });
        };

        function logIn() {
            auth.logIn(vm.user).error(function(error) {
                vm.error = error;
            }).then(function() {
                $state.go('home');
            });
        };
    }
);