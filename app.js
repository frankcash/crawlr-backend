/*
 * * Module dependencies
 * */

var config = require('./config/development');
var request = require('request');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
// var nodemailer = require('nodemailer');
// var async = require('async');
// var crypto = require('crypto');


var app = express(); // sets up the server


mongoose.connect(config.db);;

app.use(express.logger('dev'))

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting up passport authentication
require('./config/passport')(passport)
app.use(session({ secret: 'invitable invitables'}));
app.use(passport.initialize());
app.use(passport.session());
require('./routes/routes')(app, passport);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log("Crawlr-Backend is now running");
app.listen(3000)
