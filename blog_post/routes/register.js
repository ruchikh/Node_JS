var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User');


/* GET users listing. */
router.get('/', function(req, res) {
	User.find({}, (err, users) =>{	
  res.render('form', {users: users});
	})
});

module.exports = router;
