require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;
let sequelize2;

if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is available, use it for both sequelize and sequelize2
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  sequelize2 = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not available, use local configurations for sequelize and sequelize2
  // sequelize = new Sequelize(
  //   process.env.DB_NAME,
  //   process.env.DB_USER,
  //   process.env.DB_PASSWORD,
  //   {
  //     host: 'localhost',
  //     dialect: 'mysql',
  //     port: 3306
  //   }
  // );

  // sequelize2 = new Sequelize(
  //   process.env.DB_NAME_2,
  //   process.env.DB_USER,
  //   process.env.DB_PASSWORD,
  //   {
  //     host: 'localhost',
  //     dialect: 'mysql',
  //     port: 3306
  //   }
  // );
}

module.exports = {
  sequelize: sequelize,
  sequelize2: sequelize2
};
