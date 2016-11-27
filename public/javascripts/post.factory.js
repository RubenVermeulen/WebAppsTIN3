angular.module('webApps').factory('posts', function($http, auth, Flash) {
    var o = {
        posts: [],
        getAll: getAll,
        create: create,
        upvote: upvote,
        get: get
    };

    function getAll() {
        return $http.get('/posts', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            angular.copy(data, o.posts);
        });
    }

    function create(post) {
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            o.posts.push(data.data);
        });
    }

    function upvote(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            post.upvotes += 1;
        });
    }

    function get(userId) {
        return $http.get('/users/' + userId + '/tweets', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            angular.copy(data, o.posts);
        });
    }

    return o;
});
