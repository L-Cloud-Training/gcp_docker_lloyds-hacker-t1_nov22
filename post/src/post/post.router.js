const PostController = require('./post.controller');
const { Router } = require('express');

var typeorm = require("typeorm"); 
var EntitySchema = typeorm.EntitySchema; 


connection = typeorm.createConnection({ 
   "type": "postgres", 
   "host": process.env.DATABASE_HOST, 
   "port": process.env.DATABASE_PORT, 
   "username": process.env.DATABASE_USERNAME, 
   "password": process.env.DATABASE_PASSWORD, 
   "database": process.env.DATABASE_NAME,
   "synchronize": true, 
   "logging": false, 
   entities: [ new EntitySchema(require("../entity/post.json"))
   ] 
});

const postController = PostController();

const router = Router();

router.post('/posts', postController.createPost);
///router.get('/posts/:id', postController.getPostById);
//router.get('/posts/funds/:id', postController.getPostFundsById);
router.get('/posts', postController.getAllPosts);
router.put('/posts/:id', postController.updatePost);
router.put('/posts/funds/:id', postController.updatePostFunds);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
