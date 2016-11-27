angular.module('webApps').factory('users', function($http, auth) {
    var o = {
        user: {},
        users: [],
        posts: [],

        getAll: getAll,
        get: get,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };

    function getAll() {
        return $http.get('/users', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).then(function(data) {
            angular.copy(data.data, o.users);
        });
    }

    function get(userId) {
        return $http.get('/users/' + userId, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).then(function(data) {
            o.user = data.data;
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
