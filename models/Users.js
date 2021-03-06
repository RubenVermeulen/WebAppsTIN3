var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true},
    firstName: String,
    lastName: String,
    about: String,
    website: String,
    hash: String,
    salt: String,
    follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});


UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    // set expiration to 60 days
    var today = new Date();
    var exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        exp: parseInt(exp.getTime() / 1000)
    }, 'SECRET');
};

mongoose.model('User', UserSchema);
