angular.module('webApps').factory('posts', function($http, auth) {
    var o = {
        post: {},
        posts: [],
        getAll: getAll,
        getPost: getPost,
        create: create,
        createComment: createComment,
        upvote: upvote,
        upvoteComment: upvoteComment,
        downvote: downvote,
        downvoteComment: downvoteComment,
        get: get,
        deleteComment: deleteComment
    };

    function getAll() {
        return $http.get('/posts', {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            angular.copy(data, o.posts);
        });
    }

    function getPost(id) {
        return $http.get('/posts/' + id, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            o.post = data;
        });
    }

    function create(post) {
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            o.posts.push(data);
        });
    }

    function createComment(post, comment) {
        return $http.post('/posts/' + post._id, comment, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
            o.post.comments.push(data);
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

    function upvoteComment(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            comment.upvotes.push(auth.currentUser()._id);
        });
    }

    function downvoteComment(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote', null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            var index = comment.upvotes.indexOf(auth.currentUser()._id);
            comment.upvotes.splice(index, 1);
        });
    }

    function deleteComment(post, comment) {
        return $http.delete('/posts/' + post._id + '/comments/' + comment._id, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function() {
            var index = post.comments.indexOf(comment._id);
            post.comments.splice(index, 1);
        });
    }

    return o;
});
