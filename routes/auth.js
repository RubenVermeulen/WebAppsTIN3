var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/config.json');
var mailgun = require('mailgun-js')(config.mailgun);

// models
var User = mongoose.model('User');

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
        return res.status(400).json({message: 'Please fill out all fields'});
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

module.exports = router;
