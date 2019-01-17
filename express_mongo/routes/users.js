var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User');


/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, (err, user) => {
		console.log(user)
  res.render('users', { users:  user});
	})
});


router.get('/:id', function(req, res) {
	var id = req.params.id;
	User.findById(id, (err, user) => {
		console.log(user)
  res.render('user', { user:  user});

	})
});


router.get('/:id/edit', (req, res) => {
	var id = req.params.id;
	User.findById(id, (err, user) => {
	res.render('create', { user:  user});
	})
})

router.post('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
		if(err) res.status(400).send(err)
		res.redirect('/users')
	})
})


router.get('/:id/delete', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if(err) res.status(400).send(err)
		res.redirect('/users')
	})
})


// router.get('/', (req, res) => {
// 	var id = req.params.id;
// 	User.findById(id, (err, user) => {
// 	res.render('users', { user:  user});
// 	})
// })

module.exports = router;
