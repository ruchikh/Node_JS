var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ArticleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    feature_img: String,
    likes: {type: Number, default: 0},
    tags: String,
  },
  {timestamps: {createdAt: "created_At"}},

  // author: {
  // 	type: mongoose.Schema.Types.ObjectId,
  // 	ref: 'User'
  // },
  // comments: [{
  // 	author: {
  // 		type: mongoose.Schema.Types.ObjectId,
  // 		ref: 'User'
  // 	}
  // 	text: String
  // }]
  
);

var Article = mongoose.model('Article', ArticleSchema)


module.exports = Article;
 