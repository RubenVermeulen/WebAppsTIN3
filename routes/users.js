var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

// models
var User = mongoose.model('User');
var Post = mongoose.model('Post');

// middlewares
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});

// params
router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function(err, user) {
        if (err) {
            return next(err);
        }

        if ( ! user) {
            return next(new Error('can\'t find user'));
        }

        req.user = user;

        return next();
    });
});

// routes
router.get('/', auth, function(req, res, next) {
    User.find({_id: {$ne: req.payload._id}}, function(err, users) {
        if (err) {
            return next(err);
        }

        return res.json(users);
    });
});

router.get('/:user', auth, function(req, res, next) {

    return res.json(req.user);

});

router.get('/:user/followers', auth, function(req, res, next) {

    req.user.populate('followers',function(err, user) {
        if (err) {
            return next(err);
        }

        return res.json(user.followers);
    });

});

router.get('/:user/following', auth, function(req, res, next) {

    req.user.populate('follows',function(err, user) {
        if (err) {
            return next(err);
        }

        return res.json(user.follows);
    });

});

router.get('/:user/tweets', auth, function(req, res, next) {

    Post.find({author: req.user._id})
        .populate('author')
        .exec(function(err, posts) {
            if (err) {
                return next(err);
            }

            return res.json(posts);
        });

});

router.put('/subscribe', auth, function(req, res, next) {

    var userId = req.body.userId;

    if (!userId || userId === '') {
        return res.status(400).json({message: 'User id required'});
    }

    // Followers
    User.findOne({_id: userId}, function(err, user) {
        if (err) {
            return next(err);
        }

        user.followers.push(req.payload._id);

        user.save(function(err) {
            if (err) {
                return next(err);
            }
        });
    });

    // Follows
    User.findById(req.payload._id, function(err, user) {
        if (err) {
            return next(err);
        }

        user.follows.push(userId);

        user.save(function(err, user) {
            if (err) {
                return next(err);
            }

            return res.json(user);
        });
    });

});

router.put('/unsubscribe', auth, function(req, res, next) {

    var userId = req.body.userId;

    if (!userId || userId === '') {
        return res.status(400).json({message: 'User id required'});
    }

    // Followers
    User.findById(userId, function(err, user) {
        if (err) {
            return next(err);
        }

        user.followers.pull(req.payload._id);

        user.save(function(err) {
            if (err) {
                return next(err);
            }
        });
    });

    // Follows
    User.findById(req.payload._id, function(err, user) {
        if (err) {
            return next(err);
        }

        user.follows.pull(userId);

        user.save(function(err, user) {
            if (err) {
                return next(err);
            }

            return res.json(user);
        });
    });

});

module.exports = router;
