// connection.js

require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use JawsDB configuration for production
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql',
    logging: false,
  });
} else {
  // Use local configuration for development
  sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  });
}

module.exports = sequelize;
