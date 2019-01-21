var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('User');


/* GET users listing. */
router.post('/login', function(req, res) {
var {name, password} = req.body
	User.findOne({name: name}, (err, user) =>{	
		if(!user) res.status(500).send(err)
			if(!bcrypt.compareSync(password, userId))
				req.session.userId = userId;
 				res.redirect('/posts');
	})
});





module.exports = router;
