var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User');


router.get('/users', function(req, res) {
	User.find({}, (err, users) => {
		console.log(users)
		if(err) res.send(err);
		res.json({users: users})
	})
})


router.get('/:id/edit', (req, res) => {
	var id = req.params.id;
	User.findById(id, (err, user) => {
	res.json({ user:  user});
	})
})



module.exports = router;
