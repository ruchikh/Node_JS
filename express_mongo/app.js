var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Users', {useNewUrlParser: true}, (err) => {
	if(err){
		throw err
	}else {
		console.log('connected')
	}
});
const bcrypt = require('bcrypt');
var app = express();
require('./models/User');
var User = mongoose.model('User')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require('./controller/apiController')




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', api)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.get('/user', function (req, res, next) {
  User.find({}, function(err, users) {
    if (err) { return next(err) }
  })
})

app.post("/user", (req, res) => {
  var user = new User(req.body);
  user.save((err, user) => {
  	if(err) res.status(401).send(err);
  	res.redirect('/users');
  });
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
