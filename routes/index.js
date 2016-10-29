var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

// models

// middlewares
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
