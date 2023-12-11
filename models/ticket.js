const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  property: DataTypes.STRING,
  problemDescription: DataTypes.TEXT,
  dateNoticed: DataTypes.DATE,
  todaysDate: DataTypes.DATE,
}, {
  tableName: 'tickets',
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

module.exports = { Ticket };
