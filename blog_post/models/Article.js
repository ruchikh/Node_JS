var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug')

let ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    feature_img: String,
    likes: {type: Number, default: 0},
    claps: {type: Number, default: 0},
    tags: String,
    slug: String,
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    comments: [{
    		type: Schema.Types.ObjectId,
    		ref: 'Comment'
    }]
    
  },{timestamps: {createdAt: "created_At"}});


    ArticleSchema.pre("save", function(next){
        this.slug = slug(this.title, {lower: true})
      next()
    })

var Article = mongoose.model('Article', ArticleSchema)


module.exports = Article;
 