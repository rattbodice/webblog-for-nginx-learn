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

User.belongsToMany(Post, { through: Comment });
Post.belongsToMany(User, { through: Comment });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname,'uploads');
    cb(null, destinationPath); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename (you can customize this logic)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require("./route")(app,upload);

app.listen(port, async () => {
  conn = await initMySQL();
  await sequelize.sync();
  console.log(`Listening at http://localhost:${port}`);
});
