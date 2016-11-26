angular.module('webApps').factory('users', function($http, auth) {
    var o = {
        users: [],
        getAll: getAll,
        get: get,
        follows: follows,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };

    function getAll() {
        return $http.get('/users', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            angular.copy(data, o.users);
        });
    }

    function get(userId) {
        return $http.get('/users/' + userId, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    }

    function follows(userId) {
        return $http.get('/users/' + userId + '/follows', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    }

    function subscribe(userId) {
        return $http.put('/users/subscribe', userId, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    }

    function unsubscribe(userId) {
        return $http.put('/users/unsubscribe', userId, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    }

    return o;
});
