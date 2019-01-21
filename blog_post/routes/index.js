var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User')
var bcrypt = require('bcrypt');
var Article = mongoose.model('Article')
// var app = require('../app.js')


/* GET home page. */

var isUser = ((req, res, next) => {
	console.log(req.session)
	if(req.session.userId){
		req.user = User.findById(req.session.userId, (err, user) => {
		res.locals.user = user;
		next()
		});
	}else{
	res.redirect('/login')
	}
})


router.get('/', function(req, res) {
	Article.find({}, (err, articles) => {
  res.render('articles', {articles: articles, title: 'Blog' });
	})
});


// router.get('/:id', function(req, res) {
// 	Article.find({}, (err, article) => {
// 		console.log(article)
//   res.render('article', { article: article});
// 	})
// });


router.get('/posts/new', isUser, function(req, res, next) {
	User.find({}, (err, user) => {
  res.render('index', { title: "Blog" });
	})
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
var {email, password} = req.body
	User.findOne({email: email}, (err, user) =>{	
		if(!user) res.status(500).send(err)
			if(!bcrypt.compareSync(password, user.password)){res.send(err)}
				req.session.userId = user.id;
 				res.redirect('/posts');
		})
});


router.get('/logout', (req, res) => {
		req.session.destroy();
		res.redirect('/login')
})






module.exports = router;
