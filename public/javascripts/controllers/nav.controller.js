angular.module('webApps').controller('NavController',
    function(auth, $state) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = logOut;

        function logOut() {
            auth.logOut();
            $state.go('login');
        }
    }
);