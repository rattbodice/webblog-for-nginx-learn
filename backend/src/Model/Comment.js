import { sequelize, DataTypes } from '../db.js';
  const Comment = sequelize.define(
    "comments",
    {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
 export default Comment
