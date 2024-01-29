const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 3000;
const { sequelize, initMySQL ,DataTypes } = require('./db');

let conn = null;

const User = require('./models/User')
const Post = require('./models/Post')
const Comment = require('./models/Comment')

User.hasMany(Post,{as:'authorId'})
Post.belongsTo(User)

Post.hasMany(Comment, {foreignKey: 'cm_postId'})
Comment.belongsTo(Post, {foreignKey: 'cm_postId'})
User.hasMany(Comment, {foreignKey: 'cm_userId'})
Comment.belongsTo(User, {foreignKey: 'cm_userId'})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

require('./route')(app)


app.listen(port, async () => {
    conn = await initMySQL();
    await sequelize.sync()
    console.log(`Listening at http://localhost:${port}`);
});
