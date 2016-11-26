var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

// models
var User = mongoose.model('User');

// middlewares
var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});

// routes
router.get('/', auth, function(req, res, next) {

    User.findOne({_id: req.payload._id}, function(err, user) {
        if (err) {
            return next(err);
        }

        user.populate('follows', function(err, user) {
            if (err) {
                return next(err);
            }

            return res.json(user.follows);
        });
    });

});

module.exports = router;
