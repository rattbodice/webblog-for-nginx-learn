const dotenv = require("dotenv");
const { Sequelize,DataTypes } = require("sequelize");
const mysql = require("mysql2/promise");


dotenv.config();
const sequelize = new Sequelize(
  'webblog_db',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: "mysql",
  
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DATABASE CONNECTED");
  })

  .catch((err) => {
    console.log(err);
  });

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root' ,
    password: 'root',
    database: 'webblog_db'
  });
  return conn;
};

module.exports = {sequelize,initMySQL,DataTypes}
