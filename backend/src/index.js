const express = require("express");

const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const { sequelize, initMySQL, DataTypes } = require("./db");
const multer = require("multer");

let conn = null;

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

User.hasMany(Post, { as: "authorId" });
Post.belongsTo(User);

Post.hasMany(Comment, { foreignKey: "cm_postId" });
Comment.belongsTo(Post, { foreignKey: "cm_postId" });
User.hasMany(Comment, { foreignKey: "cm_userId" });
Comment.belongsTo(User, { foreignKey: "cm_userId" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the filename to the original filename
  },
});
const upload = multer({ storage: storage });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require("./route")(app,upload);

app.listen(port, async () => {
  conn = await initMySQL();
  await sequelize.sync();
  console.log(`Listening at http://localhost:${port}`);
});
