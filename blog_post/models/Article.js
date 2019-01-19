var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    feature_img: String,
    likes: {type: Number, default: 0},
    tags: String,
    comments: [{
    		type: Schema.Types.ObjectId,
    		ref: 'Comment'
    }]
    
  },{timestamps: {createdAt: "created_At"}});

var Article = mongoose.model('Article', ArticleSchema)


module.exports = Article;
 