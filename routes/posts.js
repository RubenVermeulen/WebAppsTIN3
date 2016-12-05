var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

// models
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');

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

router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function(err, comment) {
        if (err) {
            return next(err);
        }

        if ( ! comment) {
            return next(new Error('can\'t find comment'));
        }

        req.comment = comment;

        return next();
    });
});

// Posts

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

router.get('/:post', auth, function(req, res, next) {

    req.post.populate('author').populate({
        path: 'comments',
        model: 'Comment',
        populate: {
            path: 'author',
            model: 'User'
        }
    }, function(err, post) {
        if (err) {
            return next(err);
        }

        return res.json(post);
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

// Comments

router.post('/:post', auth, function(req, res, next) {

    if (!req.body.body || req.body.body === '') {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var comment = new Comment(req.body);
    comment.author = req.payload._id;

    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }

        req.post.comments.push(comment._id);

        req.post.save(function(err) {
            if (err) {
                return next(err);
            }

            comment.populate('author', function(err, comment) {
                if (err) {
                    return next(err);
                }

                res.json(comment);
            });
        });
    });
});

router.put('/:post/comments/:comment/upvote', auth, function(req, res, next) {

    var value = req.comment.upvotes.indexOf(req.payload._id);

    if (value !== -1) {
        return res.status(400).json({message: 'You\'ve already upvoted this comment.'})
    }

    req.comment.upvotes.push(req.payload._id);

    req.comment.save(function(err, post) {
        if (err) {
            return next(err);
        }

        return res.json(post);
    });

});

router.put('/:post/comments/:comment/downvote', auth, function(req, res, next) {

    var value = req.comment.upvotes.indexOf(req.payload._id);

    if (value === -1) {
        return res.status(400).json({message: 'You\'ve haven\'t upvoted this comment.'})
    }

    req.comment.upvotes.pull(req.payload._id);

    req.comment.save(function(err, post) {
        if (err) {
            return next(err);
        }

        return res.json(post);
    });

});

module.exports = router;
