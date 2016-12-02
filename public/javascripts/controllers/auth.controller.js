angular.module('webApps').controller('AuthController',
    function($state, auth, users, Flash) {
        var vm = this;

        vm.user = {};
        vm.register = register;
        vm.logIn = logIn;
        vm.changePassword = changePassword;
        vm.updateProfile = updateProfile;
        vm.getUser = getUser;

        function register() {
            auth.register(vm.user).error(function(error) {
                Flash.create('danger', '<strong>Danger!</strong> ' + error.message );
            }).success(function() {
                $state.go('home');
            });
        }

        function logIn() {
            auth.logIn(vm.user).error(function(error) {
                Flash.create('danger', '<strong>Danger!</strong> ' + error.message );
            }).success(function() {
                $state.go('home');
            });
        }

        function changePassword() {
            auth.changePassword(vm.user).error(function(error) {
                Flash.create('danger', '<strong>Danger!</strong> ' + error.message );
            }).success(function(success) {
                Flash.create('success', '<strong>Success!</strong> Password changed!');
                vm.user = {};
            })
        }

        function updateProfile() {
            auth.updateProfile(vm.user).error(function(error) {
                Flash.create('danger', '<strong>Danger!</strong> ' + error.message );
            }).success(function(success) {
                Flash.create('success', '<strong>Success!</strong> profile updated!');
            })
        }

        function getUser() {
            users.get(auth.currentUser()._id).success(function() {
                vm.user = users.user;
            });


        }
    }
);