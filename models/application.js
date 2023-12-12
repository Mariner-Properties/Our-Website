const { Sequelize, DataTypes } = require('sequelize');
const applicationsDB = new Sequelize('applications_db', 'nm4x7xm9burykoj3', 'sdajfdghkxhl1kmf', {
    host: 'en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
  });

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  addressOfPropertyYouWantToRent: DataTypes.STRING,
  yourName: DataTypes.STRING,
  socialSecurityNumber: DataTypes.STRING,
  birthDate: DataTypes.DATE,
  presentAddress: DataTypes.TEXT,
  city: DataTypes.TEXT,
  state: DataTypes.STRING,
  zip: DataTypes.INTEGER,
  phone: DataTypes.STRING,
  email: DataTypes.TEXT,
  permanentAddress: DataTypes.TEXT,
  permCity: DataTypes.TEXT,
  permState: DataTypes.TEXT,
  permZip: DataTypes.TEXT,
  permPhone: DataTypes.STRING,
  parentGuardianName: DataTypes.TEXT,
  parentAddress: DataTypes.TEXT,
  parentCity: DataTypes.TEXT,
  parentState: DataTypes.TEXT,
  parentZip: DataTypes.TEXT,
  parentPhone: DataTypes.STRING,
  previousTenant: DataTypes.TEXT,
  previousRentAmount: DataTypes.TEXT,
  landlordPreceptorName: DataTypes.TEXT,
  previousCity: DataTypes.TEXT,
  previousState: DataTypes.TEXT,
  previousZip: DataTypes.TEXT,
  previousPhone: DataTypes.STRING,
  sourceOfFunds: DataTypes.TEXT,
  employerName: DataTypes.TEXT,
  sourceCity: DataTypes.TEXT,
  sourceState: DataTypes.TEXT,
  sourceZip: DataTypes.TEXT,
  sourcePhone: DataTypes.STRING,
  bankName: DataTypes.TEXT,
  bankCity: DataTypes.TEXT,
  accountNumber: DataTypes.TEXT,
  averageBalance: DataTypes.TEXT,
  creditCardName: DataTypes.TEXT,
  creditCardAverageBalance: DataTypes.TEXT,
  referenceOneName: DataTypes.TEXT,
  referenceOneRelation: DataTypes.TEXT,
  referenceOneYears: DataTypes.TEXT,
  referenceOneCity: DataTypes.TEXT,
  referenceOnePhoneNumber: DataTypes.TEXT,
  referenceTwoName: DataTypes.TEXT,
  referenceTwoRelation: DataTypes.TEXT,
  referenceTwoYears: DataTypes.TEXT,
  referenceTwoCity: DataTypes.TEXT,
  referenceTwoPhoneNumber: DataTypes.TEXT,
  referenceThreeName: DataTypes.TEXT,
  referenceThreeRelation: DataTypes.TEXT,
  referenceThreeYears: DataTypes.TEXT,
  referenceThreeCity: DataTypes.TEXT,
  referenceThreePhoneNumber: DataTypes.TEXT,
  signature: {
    type: DataTypes.STRING, // Adjust the data type as needed
    allowNull: false, // Set to true if the signature is optional
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false, // Set to true if the date is optional
  },

}, {
  tableName: 'Applications',
});

applicationsDB.sync()
  .then(() => {
    console.log('applications_db synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing applications_db:', error);
  });

  module.exports = { Application };
