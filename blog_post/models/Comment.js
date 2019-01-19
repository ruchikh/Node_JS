var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let CommentSchema = new mongoose.Schema(
  {
    title:String,
    created: {type: Date, default: Date.now},
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
      }
  }
);

var Comment = mongoose.model('Comment', CommentSchema)


module.exports = Comment;
 