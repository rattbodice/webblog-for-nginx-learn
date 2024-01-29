const {sequelize,DataTypes} = require('../db.js')
const Post = sequelize.define(
  "posts",
  {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  },
  {}
);
module.exports = Post
