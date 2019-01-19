var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true}, (err) => {
	if(err){
		throw err
	}else {
		console.log('connected')
	}
});

require('./models/Article')
require('./models/Comment')

var Article = mongoose.model('Article')
var Comment = mongoose.model('Comment')



var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.get('/user', (req, res) => {
	Article.find({}, (err, articles) => {
		if(err) res.status(401).send(err)
	})
})

app.post('/user', (req, res) => {
	article = new Article(req.body)
	article.save((err, article) => {
		if(err) res.status(401).send(err)
		 res.redirect('/posts')

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
