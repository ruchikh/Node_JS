var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


  var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
  });



	userSchema.pre("save", function(next){
		this.password = bcrypt.hashSync(this.password, 10);
	  next()
	})

	// var salt = bcrypt.genSaltSync(10);
	// var hash = bcrypt.hashSync("password", salt)

	// var valid = bcrypt.compareSync("password", hash);
	// if (valid == true) {
 //    console.log(true)
	// } else if (valid == false) {
 //    console.log(false)
	// }


var User = mongoose.model('User', userSchema)


module.exports = User;
 