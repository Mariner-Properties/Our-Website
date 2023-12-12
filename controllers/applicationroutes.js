require('dotenv').config();
const express = require('express');
const { Application } = require('../models/application');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Sequelize, sequelize } = require('sequelize');
const { sequelize2 } = require('./connection');
const staticroutes = require('./staticroutes')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rpgillooly@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

router.get('/new-application', (req, res) => {
    res.render('newapplication');
  });

  // Get a specific application by ID
  router.get('/applications/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const application = await Application.findByPk(id);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error getting application by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Create a new application
  router.post('/applications', async (req, res) => {
    const newApplicationData = req.body;
    try {
      const newApplication = await Application.create(newApplicationData, {
        sequelize: sequelize2, // Use the second Sequelize instance
      });
    
    // Send email to a series of email addresses
    const emailAddresses = ['john.gillooly@irr.com', 'rpgillooly@gmail.com']; // Add your email addresses
    const subject = 'New Application Created On MarinerPropertiesRental.com!';
    const text = `A new Application has been submitted:
    <h1>Property</h1>
    <p>Address Of Property You Want to Rent: ${newApplication.addressOfPropertyYouWantToRent}</p>\n
    <h1>Their Info</h1>  
    <p>Your Name: ${newApplication.yourName}\n
      Social Security Number: ${newApplication.socialSecurityNumber}\n
      Birth Date: ${newApplication.birthDate}</p>\n
      <h1>Present Address</h1>\n
      <p>Present Address ${newApplication.presentAddress}\n
      City: ${newApplication.city}\n
      State ${newApplication.state}\n
      ZIP: ${newApplication.zip}\n
      Phone: ${newApplication.phone}\n
      Email: ${newApplication.email}\n
      City: ${newApplication.presCity}</p>\n
      <h1>Permanent Address</h1>
      <p>Permanent Address: ${newApplication.permanentAddress}\n
      City: ${newApplication.permCity}\n
      State: ${newApplication.permState}\n
      ZIP: ${newApplication.permZip}\n
      Phone: ${newApplication.permPhone}</p>\n
      <h1>Parent/Guardian Info</h1>
      <p>Parent/Guardian Name: ${newApplication.parentGuardianName}\n
      Address: ${newApplication.parentAddress}\n
      City: ${newApplication.parentCity}\n
      State: ${newApplication.parentState}\n
      ZIP: ${newApplication.parentZip}\n
      Phone: ${newApplication.parentPhone}</p>\n
      <h1>Preivous Tenancy</h1>
      <p>Previous Tenant: ${newApplication.previousTenant}\n
      Previous Rent Amount: ${newApplication.previousRentAmount}\n
      Landlord/Preceptor's Name: ${newApplication.landlordPreceptorName}\n
      City: ${newApplication.previousCity}\n
      State: ${newApplication.previousState}\n
      ZIP: ${newApplication.previousZip}\n
      Phone: ${newApplication.previousPhone}</p>\n
      <h1>Source of Funds</h1>
      <p>Source Of Funds: ${newApplication.sourceOfFunds}\n
      Employer Name: ${newApplication.employerName}\n
      Source City: ${newApplication.sourceCity}\n
      Source State: ${newApplication.sourceState}\n
      Source ZIP: ${newApplication.sourceZip}\n
      Source Phone: ${newApplication.sourcePhone}</p>\n
      <h1>Credit Info</h1>
      <p>Bank Name: ${newApplication.bankName}\n
      Bank City: ${newApplication.bankCity}\n
      Bank State: ${newApplication.bankState}\n
      Account Number: ${newApplication.accountNumber}\n
      Average Balance: ${newApplication.averageBalance}\n
      Credit Card Name: ${newApplication.creditCardName}\n
      Credit Card Average Balance: ${newApplication.creditCardAverageBalance}</p>\n
      <h1>Personal References</h1>
      <p>Reference One
      Name: ${newApplication.referenceOneName}\n
      Relation: ${newApplication.referenceOneRelation}\n
      Years Known: ${newApplication.referenceOneYears}\n
      City: ${newApplication.referenceOneCity}\n
      Phone: ${newApplication.referenceOnePhoneNumber}</p>\n
      <p>Reference Two
      Name: ${newApplication.referenceTwoName}\n
      Relation: ${newApplication.referenceTwoRelation}\n
      Years Known: ${newApplication.referenceTwoYears}\n
      City: ${newApplication.referenceTwpCity}\n
      Phone: ${newApplication.referenceTwpPhoneNumber}</p>\n
      <p>Reference Three
      Name: ${newApplication.referenceThreeName}\n
      Relation: ${newApplication.referenceThreeRelation}\n
      Years Known: ${newApplication.referenceThreeYears}\n
      City: ${newApplication.referenceThreeCity}\n
      Phone: ${newApplication.referenceThreePhoneNumber}\n
      Signature: ${newApplication.signature}\n
      Date: ${newApplication.date}</p>\n
      `;

    for (const emailAddress of emailAddresses) {
      const mailOptions = {
        from: 'rpgillooly@gmail.com',
        to: emailAddress,
        subject: subject,
        html: text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }
        // Redirect to a success page or do something else
        res.redirect('/about');
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });
  
  // Update an existing application
  router.put('/applications/:id', async (req, res) => {
    const { id } = req.params;
    const updatedApplicationData = req.body;
    try {
      const application = await Application.findByPk(id);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      await application.update(updatedApplicationData);
      res.json(application);
    } catch (error) {
      console.error('Error updating application:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete an application by ID
  router.delete('/applications/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const application = await Application.findByPk(id);
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      await application.destroy();
      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      console.error('Error deleting application:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
  