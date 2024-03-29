var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


var callbackRouter=require('./routes/callback/callback.router')
var userRouter=require('./routes/user/user.router')
var otpvalidation=require('./routes/user/user.router')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checkuser=require('./routes/subscription/subscription.route')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
 
    ],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'build')));
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/callback',callbackRouter)
app.use('/subscription',userRouter)
app.use('/',otpvalidation)
app.use('/checkuser',checkuser)



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
