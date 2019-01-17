var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Article = mongoose.model('Article')

/* GET users listing. */
router.get('/', function(req, res, next) {
	Article.find({}, (err, articles) =>{
	console.log(articles)		
  res.render('articles', {articles: articles});
	})
});


router.get('/:id', function(req, res) {
	var id = req.params.id;
	Article.findById(id, (err, article) => {
		console.log(article)
  res.render('article', { article:  article});
	})
});


router.get('/:id/edit', (req, res) =>{
	Article.findById(req.params.id, (err, article) => {
		res.render('editPage', { article:  article});
	})
})

router.post('/:id', (req, res) => {
	Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, article) => {
		if(err) res.status(400).send(err)
		res.redirect('/users')
	})
})

router.get('/:id/delete', (req, res) => {
	Article.findByIdAndRemove(req.params.id, (err, Article) =>{
		if(err) res.status(400).send(err)
			res.redirect('/users')
	})
})


router.get('/:id/likes', (req, res) => {
	Article.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}}, (err, article) => {
		res.redirect('/users')
	})
})



module.exports = router;
