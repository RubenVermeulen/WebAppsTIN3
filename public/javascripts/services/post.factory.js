angular.module('webApps').factory('posts', function($http, auth) {
    var o = {
        posts: [],
        getAll: getAll,
        create: create,
        upvote: upvote,
        downvote: downvote,
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
            o.posts.push(data);
        });
    }

    function get(userId) {
        return $http.get('/users/' + userId + '/tweets', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            angular.copy(data, o.posts);
        });
    }

    function upvote(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            post.upvotes.push(auth.currentUser()._id);
        });
    }

    function downvote(post) {
        return $http.put('/posts/' + post._id + '/downvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            var index = post.upvotes.indexOf(auth.currentUser()._id);
            post.upvotes.splice(index, 1);
        });
    }

    return o;
});
