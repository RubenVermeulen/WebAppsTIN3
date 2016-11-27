angular.module('webApps').factory('users', function($http, auth) {
    var o = {
        user: {},
        users: [],
        posts: [],
        followers: [],
        following: [],

        getAll: getAll,
        get: get,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        getFollowers: getFollowers,
        getFollowing: getFollowing
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
        }).success(function(data) {
            o.user = data;
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

    function getFollowers(userId) {
        return $http.get('/users/' + userId + '/followers', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            o.followers = data;
        });
    }

    function getFollowing(userId) {
        return $http.get('/users/' + userId + '/following', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            o.following = data;
        });
    }

    return o;
});
