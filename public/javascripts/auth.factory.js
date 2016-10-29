angular.module('webApps').factory('auth', function($http, $window) {
    var auth = {
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        register: register,
        logIn: logIn,
        logOut: logOut
    };

    function saveToken(token) {
        $window.localStorage['web-apps-token'] = token;
    }

    function getToken() {
        return $window.localStorage['web-apps-token'];
    };

    function isLoggedIn() {
        var token = auth.getToken();

        if (token) {
            var payload = angular.fromJson($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        }

        return false;
    };

    function currentUser() {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = angular.fromJson($window.atob(token.split('.')[1]));

            return payload.firstName + ' ' + payload.lastName;
        }
    };

    function register(user) {
        return $http.post('/auth/register', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    function logIn(user) {
        return $http.post('/auth/login', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    function logOut() {
        $window.localStorage.removeItem('web-apps-token');
    };

    return auth;
});