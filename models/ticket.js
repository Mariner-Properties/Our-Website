const { Sequelize, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const ticketsDB = new Sequelize('tickets_db', 'nm4x7xm9burykoj3', 'sdajfdghkxhl1kmf', {
  host: 'en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
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

ticketsDB.sync()
  .then(() => {
    console.log('tickets_db synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing tickets_db:', error);
  });
  
module.exports = { Ticket };
