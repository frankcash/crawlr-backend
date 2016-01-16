'use strict';
let passport = require('passport');
let User = require('../models/user');
let LocalStrategy = require('passport-local').Strategy;

// Serialize session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize sessions
passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
    }, '-salt -password', function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    User.findOne({
        username: username.toLowerCase()
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user || !user.authenticate(password)) {
            return done(null, false, {
                message: 'Invalid username or password'
            });
        }

        return done(null, user);
    });
}));
