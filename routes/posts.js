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

    User.findOne({_id: req.payload._id} ,function(err, user) {
        if (err) {
            return next(err);
        }

        Post.find({author: {$in: user.follows}})
            .populate('author')
            .exec(function(err, posts) {
                if (err) {
                    return next(err);
                }

                return res.json(posts);
            });
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
    req.post.upvote(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(post);
    });
});

module.exports = router;
