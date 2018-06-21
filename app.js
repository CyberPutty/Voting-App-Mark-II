
 
 require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport= require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter= require('./routes/posts');
var authRouter= require('./routes/auth');
console.log(process.env.NODE_ENV);
// view engine setup
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
 
// Basic usage
mongoose.connect(process.env.MONGO_URI);
 
var app = express();
 
//  app.set('views', path.join(__dirname, 'views'));
//  app.set('view engine', 'jade');

 if(process.env.NODE_ENV=== 'production'){
   app.use(express.static("client/build"));
 }

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/profile', indexRouter);
app.use('/auth',authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.status.json({
    message: err.message,
    error: err
});
});

module.exports = app;
