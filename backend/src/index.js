const express = require('express');
const app = express();
const port = 3000;
const { sequelize, initMySQL ,DataTypes } = require('./db');

let conn = null;

const User = require('./Model/User')
const Post = require('./Model/Post')
const Comment = require('./Model/Comment')

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(port, async () => {
    conn = await initMySQL();
    await sequelize.sync()
    console.log(`Listening at http://localhost:${port}`);
});
