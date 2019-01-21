var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');
const date = moment();
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true}, (err) => {
	if(err){
		throw err
	}else {
		console.log('connected')
	}
});

require('./models/Article')
require('./models/Comment')
require('./models/User')


var Article = mongoose.model('Article')
var Comment = mongoose.model('Comment')
var User = mongoose.model('User')




var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var registerRouter = require('./routes/register');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'keyboard', 
	resave: false,
	saveUninitialized: true, 
	store: new MongoStore({ mongooseConnection: mongoose.connection })}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/posts',  postsRouter);
app.use('/register', registerRouter)


app.get('/posts/:id', function(req, res){
  var id = req.params.name; 
  console.log(id)   
  User.findOne({id : _id}, function(err, result){      
    res.render('user', {user : user}
    );
  })
})

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

