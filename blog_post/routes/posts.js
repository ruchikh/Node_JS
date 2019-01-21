var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Article = mongoose.model('Article')
var Comment = mongoose.model('Comment');
var User = mongoose.model('User')
var postController = require('../controller/postController')


/* GET users listing. */
router.post('/', postController.isUser, postController.postArticle)

router.post("/register", postController.registerUser);

router.get('/', postController.isUser, postController.allposts);

router.get('/:slug', postController.postsDetail);

router.get('/:id/edit', postController.isUser, postController.editPosts)

router.post('/:id', postController.isUser, postController.updatePosts)

router.get('/:id/delete', postController.isUser,  postController.deletePosts)

router.get('/:id/likes', postController.isUser, postController.likePosts)

router.post('/:id/comment', postController.isUser, postController.comment);

router.get('/:id/comment/delete', postController.isUser, postController.deleteComment)

router.get('/:id/comment/edit',postController.isUser,  postController.editComment)

router.post('/comment/:id', postController.isUser, postController.updateComment)



module.exports = router;
