const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const CommentController = require('./controllers/CommentController')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    // User
    app.get('/users', UserController.index);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.get('/user/:userId', UserController.show)
    // Post
    app.get('/posts', PostController.index);
    app.post('/post', PostController.create);
    app.put('/post/:postId', PostController.put);
    app.delete('/post/:postId', PostController.remove)

     // Comment
     app.get('/comments', CommentController.index);
     app.post('/comment', CommentController.create);
     app.put('/comment/:commentId', CommentController.put);
     app.delete('/comment/:commentId', CommentController.remove)
}