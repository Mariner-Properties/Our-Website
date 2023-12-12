require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  console.error('JAWSDB_URL is not set in environment variables');
  // Handle the error or exit the application
}

module.exports = {
  sequelize: sequelize
};
