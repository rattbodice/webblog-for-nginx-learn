const dotenv = require("dotenv");
const { Sequelize,DataTypes } = require("sequelize");
const mysql = require("mysql2/promise");


dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "db",
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
    host: "db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return conn;
};

module.exports = {sequelize,initMySQL,DataTypes}
