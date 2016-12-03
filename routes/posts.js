var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

// models
var Post = mongoose.model('Post');
var User = mongoose.model('User');

// middlewares
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});

router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, post) {
        if (err) {
            return next(err);
        }

        if ( ! post) {
            return next(new Error('can\'t find post'));
        }

        req.post = post;

        return next();
    });
});

router.get('/', auth, function(req, res, next) {

    User.findById(req.payload._id, function(err, user) {
        if (err) {
            return next(err);
        }

        if (user !== null) {
            Post.find({$or: [{author: user._id}, {author: {$in: user.follows}}]})
                .populate('author')
                .exec(function(err, posts) {
                    if (err) {
                        return next(err);
                    }

                    return res.json(posts);
                });
        }
    });

});

router.post('/', auth, function(req, res, next) {

    if (!req.body.body || req.body.body === '') {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var post = new Post(req.body);
    post.author = req.payload._id;

    post.save(function(err, post) {
        if (err) {
            return next(err);
        }

        post.populate('author', function(err, post) {
            if (err) {
                return next(err);
            }

            res.json(post);
        });
    });
});

router.put('/:post/upvote', auth, function(req, res, next) {

    var value = req.post.upvotes.indexOf(req.payload._id);

    if (value !== -1) {
        return res.status(400).json({message: 'You\'ve already upvoted this post.'})
    }

    req.post.upvotes.push(req.payload._id);

    req.post.save(function(err, post) {
        if (err) {
            return next(err);
        }

        return res.json(post);
    });

});

router.put('/:post/downvote', auth, function(req, res, next) {

    var value = req.post.upvotes.indexOf(req.payload._id);

    if (value === -1) {
        return res.status(400).json({message: 'You\'ve haven\'t upvoted this post.'})
    }

    req.post.upvotes.pull(req.payload._id);

    req.post.save(function(err, post) {
        if (err) {
            return next(err);
        }

        return res.json(post);
    });

});

module.exports = router;
