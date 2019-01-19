var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Article = mongoose.model('Article')
var Comment = mongoose.model('Comment');


/* GET users listing. */
router.get('/', function(req, res, next) {
	Article.find({}, (err, articles) =>{	
		console.log(articles)
  res.render('articles', {articles: articles});
	})
});


router.get('/:id', function(req, res) {
	var id = req.params.id;
	Article.findOne({_id: id}).populate('comments').exec((err, article) => {
  	res.render('article', { article:  article});
	});
});


router.get('/:id/edit', (req, res) =>{
	Article.findById(req.params.id, (err, article) => {
		res.render('editPage', { article:  article});
	})
})

router.post('/:id', (req, res) => {
	Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, article) => {
		if(err) res.status(400).send(err)
		res.redirect('/posts')
	})
})

router.get('/:id/delete', (req, res) => {
	Article.findByIdAndRemove(req.params.id, (err, Article) =>{
		if(err) res.status(400).send(err)
			res.redirect('/posts')
	})
})


router.get('/:id/likes', (req, res) => {
	Article.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}}, (err, article) => {
		res.redirect('/posts')
	})
})

router.post('/:id/comment', (req, res) => {
	var comment = new Comment(req.body)
	comment.save((err, comment) => {
		if(err) res.status(400).send(err)
			Article.findByIdAndUpdate(req.params.id, {$push: {comments: comment._id}}, {new :true}, (err, post) => {
				if(err) res.status(400).send(err)
				res.redirect(`/posts/${req.params.id}`)
			})
	})
});

router.get('/:id/comment/delete', (req, res) => {
	console.log(req.params.id)
	Comment.findByIdAndDelete(req.params.id, (err, comment) =>{
		if(err) res.status(400).send(err)
			res.redirect(`/posts/${comment.postId}`)
	})
})


router.get('/:id/comment/edit', (req, res) => {
	Comment.findById(req.params.id, (err, comment) =>{
		console.log(comment)
		if(err) res.status(400).send(err)
			res.render(`editComment`, {comment:comment})
	})
})

router.post('/comment/:id', (req, res) => {
	var id = req.params.id;
	Comment.findByIdAndUpdate(id, req.body, (err, data) => {
		if(err) res.status(400).send(err);
		res.redirect(`/posts/${data.postId}`)
	})
})



module.exports = router;
