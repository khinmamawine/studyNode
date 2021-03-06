var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose =  require('mongoose');
var post = require('./routes/posts');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session =require("express-session");
// var posts = require('./routes/posts');

var app = express();

mongoose.connect('mongodb://khinmamawine:khinmamawine123@ds045054.mlab.com:45054/studynode');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB  connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '@this@is@session99,',
 resave: false,
 saveUnitialized :true
}));
app.use(function (req,res,next) {
  res.locals.user =req.session.user;
  next();
})
app.use('/', indexRouter);
app.use(function (req,res,next) {
  console.log('user path', req.path);
  if(req.session.user){
    next();
  }else {
    res.redirect('/login');
  }
});
app.use('/users', usersRouter);
app.use('/posts', post);

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
  res.render('error');
});

module.exports = app;
