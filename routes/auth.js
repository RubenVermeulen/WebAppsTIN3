var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var config = require('../config/config.json');
var mailgun = require('mailgun-js')(config.mailgun);

// models
var User = mongoose.model('User');

// middlewares
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/register', function(req, res, next) {

    if (!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();

    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    user.setPassword(req.body.password);

    user.save(function (err) {
        if (err) {
            return next(err);
        }

        var data = {
            from: 'no-reply@rubenvermeulen.be',
            to: user.email,
            subject: 'Registered',
            text: 'You have been registered successfully! Enjoy!'
        };

        mailgun.messages().send(data, function(err, body) {
        });

        return res.json({token: user.generateJWT()});
    });

});

router.post('/login', function(req, res, next) {

    if ( ! req.body.email || ! req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields.'});
    }

    // middleware
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.json({token: user.generateJWT()});
        }
        else {
            return res.status(401).json(info);
        }
    })(req, res, next);

});

router.put('/changePassword', auth, function(req, res, next) {

    if ( ! req.body.passwordCurrent || ! req.body.passwordNew || ! req.body.passwordConfirm) {
        return res.status(400).json({message: 'Please fill out all fields.'});
    }

    if (req.body.passwordNew != req.body.passwordConfirm) {
        return res.status(400).json({message: 'Confirm password is different from new password.'});
    }

    User.findOne({_id: req.payload._id}, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user.validPassword(req.body.passwordCurrent)) {
            return res.status(400).json({message: 'Incorrect password.'});
        }

        user.setPassword(req.body.passwordNew);

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            var data = {
                from: 'no-reply@rubenvermeulen.be',
                to: user.email,
                subject: 'Password changed',
                text: 'Your password has changed!'
            };

            mailgun.messages().send(data, function(err, body) {
            });

            return res.json({message: 'Password changed.'});
        });
    });

});

router.put('/updateProfile', auth, function(req, res, next) {

    User.findOne({_id: req.payload._id}, function(err, user) {
        if (err) {
            return next(err);
        }

        if (req.body.about || req.body.about === '') {
            user.about = req.body.about ? req.body.about : undefined;
        }

        if (req.body.website || req.body.website === '') {
            user.website = req.body.website ? req.body.website : undefined;
        }

        user.save(function(err) {
            if (err) {
                return next(err);
            }

            return res.json(user);
        })
    });

});

module.exports = router;
