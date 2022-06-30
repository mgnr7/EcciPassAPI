const util = require("util");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

let databaseConnection;
let query;

exports.connectDb = () => {};

exports.getQuery = () => {
  return query;
};
