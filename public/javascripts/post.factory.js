angular.module('webApps').factory('posts', function($http, auth) {
    var o = {
        posts: [],
        getAll: getAll,
        create: create,
        upvote: upvote,
        get: get,
        addComment: addComment,
        upvoteComment: upvoteComment
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

    function upvote(post) {
        return $http.put('/posts/' + post._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            post.upvotes += 1;
        });
    }

    function get(id) {
        return $http.get('/posts/' + id, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).then(function(res) {
            return res.data;
        });
    }

    function addComment(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    }

    function upvoteComment(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            comment.upvotes += 1;
        });
    }

    return o;
});
