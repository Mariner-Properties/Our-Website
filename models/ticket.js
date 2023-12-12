const { Model, DataTypes } = require('sequelize');
const sequelize = require('../controllers/connection');

class Ticket extends Model {}

Ticket.init({
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
  sequelize, // Pass the Sequelize instance here
  tableName: 'tickets',
});

sequelize.sync()
  .then(() => {
    console.log('tickets_db synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing tickets_db:', error);
  });

  
module.exports = { Ticket };
