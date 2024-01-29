const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const CommentController = require('./controllers/CommentController')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}