var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Article = mongoose.model('Article')
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');


// check user logged in 
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


var postArticle = function (req, res) {
	article = new Article(req.body);
	article.author = req.session.userId;
	article.save((err, article) => {
		if(err) res.status(401).send(err)
		 res.redirect('/posts')

	})
}

var registerUser = function(req, res){
  var user = new User(req.body);
  user.save((err, user) => {
  	if(err) res.status(401).send(err);
  	res.redirect('/login');
  });
}

// display all posts
var allposts = function(req, res) {
	Article.find({}, (err, articles) => {	
  res.render('articles', {articles: articles});
	})
}

var postsDetail = function(req, res) {
	var slug = req.params.slug;
	Article.findOne({'slug' : slug}).populate('comments').exec((err, article) => {
  	res.render('article', { article:  article});
	});
}

var editPosts = function (req, res){
	Article.findById(req.params.id, (err, article) => {
		res.render('editPage', { article:  article});
	})
}

var updatePosts = function (req, res) {
	Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, article) => {
		if(err) res.status(400).send(err)
		res.redirect('/posts')
	})
}

var deletePosts = function (req, res){
	Article.findByIdAndRemove(req.params.id, (err, Article) =>{
		if(err) res.status(400).send(err)
			res.redirect('/posts')
	})
}

var likePosts = function (req, res){
	Article.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}}, (err, article) => {
		res.redirect('/posts')
	})
}

var comment =  function (req, res){
	var comment = new Comment(req.body)
	comment.author = req.session.userId;
	comment.save((err, comment) => {
		if(err) res.status(400).send(err)
			Article.findByIdAndUpdate(req.params.id, {$push: {comments: comment._id}}, {new :true}, (err, post) => {
				if(err) res.status(400).send(err)
				res.redirect(`/posts/${post.slug}`)
			})
	})
}

var deleteComment = function (req, res){
	console.log(req.params.id)
	Comment.findByIdAndDelete(req.params.id, (err, comment) =>{
		if(err) res.status(400).send(err)
		Article.findById(comment.postId, (err, post) => {
			res.redirect(`/posts/${post.slug}`)			
		})
	})
}

var editComment = function (req, res){
	Comment.findById(req.params.id, (err, comment) =>{
		if(err) res.status(400).send(err)
			res.render(`editComment`, {comment:comment})
	})
}

var updateComment = function (req, res){
	var id = req.params.id;
	Comment.findByIdAndUpdate(id, req.body, (err, data) => {
		if(err) res.status(400).send(err);
		Article.findById(data.postId, (err, post) => {
			res.redirect(`/posts/${post.slug}`)			
		})
	})
}


module.exports = {
	registerUser,
	postArticle,
	allposts, 
	isUser,
	postsDetail,
	editPosts,
	updatePosts,
	deletePosts,
	likePosts,
	comment,
	deleteComment,
	editComment,
	updateComment
}