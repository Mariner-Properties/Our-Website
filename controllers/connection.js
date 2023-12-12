require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use JAWSDB URL if available
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql', // or your database dialect
    logging: false, // Disable logging SQL queries (optional)
  });
} else {
  // Provide explicit values for host, username, password, and database
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // or your database dialect
    logging: false, // Disable logging SQL queries (optional)
  });
}

module.exports = {
  sequelize: sequelize,
};
