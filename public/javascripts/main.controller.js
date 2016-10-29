angular.module('webApps').controller('MainController',
    function(auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
    }
);