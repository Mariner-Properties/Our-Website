const dotenv = require('dotenv').config({ path: '../.env' });
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

// Sequelize initialization
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

// Ticket model definition
const Ticket = sequelize.define('Ticket', {
  title: DataTypes.STRING,
  property: DataTypes.STRING,
  problemDescription: DataTypes.TEXT,
  dateNoticed: DataTypes.DATE,
  todaysDate: 
  {type: DataTypes.DATE,
  defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),},
});

// Function to seed the database with JSON data
async function seedDatabase() {
  // Read JSON file
  const rawData = fs.readFileSync('ticketSeedData.json');
  const jsonData = JSON.parse(rawData);

  // Create records in the database
  await Ticket.bulkCreate(jsonData);
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('Database seeded successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding the database:', error);
    process.exit(1);
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
