const {sequelize,DataTypes} = require('../db.js')
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passWord: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
module.exports = User
