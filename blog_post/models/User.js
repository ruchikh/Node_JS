var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


  var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: Number
  });


	userSchema.pre("save", function(next){
		this.password = bcrypt.hashSync(this.password, 10);
	  next()
	})


var User = mongoose.model('User', userSchema)


module.exports = User;
 