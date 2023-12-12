require('dotenv').config();
const express = require('express');
const { Application } = require('../models/application');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Sequelize, sequelize } = require('sequelize');
const { sequelize2 } = require('./connection');
const staticroutes = require('./staticroutes')

router.get('/new-application', (req, res) => {
    res.render('newApplication');
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
    <p>Address Of Property You Want to Rent: ${newApplication.addressOfPropertyYouWantToRent}</p>\n
      <p>Your Name: ${newApplication.yourName}</p>
      <p>Social Security Number: ${newApplication.socialSecurityNumber}</p>
      <p>Birth Date: ${newApplication.birthDate}</p>\n
      <p>Present Address ${newApplication.presentAddress}</p>
      <p>City: ${newApplication.city}</p>
      <p>State ${newApplication.state}</p>\n
      <p>ZIP: ${newApplication.zip}</p>
      <p>Phone: ${newApplication.phone}</p>
      <p>Email: ${newApplication.email}</p>\n
      <p>Present Address: ${newApplication.presentAddress}</p>
      <p>City: ${newApplication.presCity}</p>
      <p>Permanent Address: ${newApplication.permanentAddress}</p>
      <p>City: ${newApplication.permCity}</p>
      <p>State: ${newApplication.permState}</p>
      <p>ZIP: ${newApplication.permZip}</p>
      <p>Phone: ${newApplication.permPhone}</p>
      <p>Parent/Guardian Name: ${newApplication.parentGuardianName}</p>
      <p>Address: ${newApplication.parentAddress}</p>
      <p>City: ${newApplication.parentCity}</p>
      <p>State: ${newApplication.parentState}</p>
      <p>ZIP: ${newApplication.parentZip}</p>
      <p>Phone: ${newApplication.parentPhone}</p>
      <p>Previous Tenant: ${newApplication.previousTenant}</p>
      <p>Previous Rent Amount: ${newApplication.previousRentAmount}</p>
      <p>Landlord/Preceptor's Name: ${newApplication.landlordPreceptorName}</p>
      <p>City: ${newApplication.previousCity}</p>
      <p>State: ${newApplication.previousState}</p>
      <p>ZIP: ${newApplication.previousZip}</p>
      <p>Phone: ${newApplication.previousPhone}</p>
      <p>Source Of Funds: ${newApplication.sourceOfFunds}</p>
      <p>Employer Name: ${newApplication.employerName}</p>
      <p>Source City: ${newApplication.sourceCity}</p>
      <p>Source State: ${newApplication.sourceState}</p>
      <p>Source ZIP: ${newApplication.sourceZip}</p>
      <p>Source Phone: ${newApplication.sourcePhone}</p>
      <p>Bank Name: ${newApplication.bankName}</p>
      <p>Bank City: ${newApplication.bankCity}</p>
      <p>Bank State: ${newApplication.bankState}</p>
      <p>Account Number: ${newApplication.accountNumber}</p>
      <p>Average Balance: ${newApplication.averageBalance}</p>
      <p>Credit Card Name: ${newApplication.creditCardName}</p>
      <p>Credit Card Average Balance: ${newApplication.creditCardAverageBalance}</p>
      <p>Reference One
      Name: ${newApplication.referenceOneName}</p>
      <p>Relation: ${newApplication.referenceOneRelation}</p>
      <p>Years Known: ${newApplication.referenceOneYears}</p>
      <p>City: ${newApplication.referenceOneCity}</p>
      <p>Phone: ${newApplication.referenceOnePhoneNumber}</p>
      <p>Reference Two
      Name: ${newApplication.referenceTwoName}</p>
      <p>Relation: ${newApplication.referenceTwoRelation}</p>
      <p>Years Known: ${newApplication.referenceTwoYears}</p>
      <p>City: ${newApplication.referenceTwpCity}</p>
      <p>Phone: ${newApplication.referenceTwpPhoneNumber}</p>
      <p>Reference Three
      Name: ${newApplication.referenceThreeName}</p>
      <p>Relation: ${newApplication.referenceThreeRelation}</p>
      <p>Years Known: ${newApplication.referenceThreeYears}</p>
      <p>City: ${newApplication.referenceThreeCity}</p>
      <p>Phone: ${newApplication.referenceThreePhoneNumber}</p>
      `;

    for (const emailAddress of emailAddresses) {
      const mailOptions = {
        from: 'rpgillooly@gmail.com',
        to: emailAddress,
        subject: subject,
        text: text,
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
        // Handle errors (e.g., render an error page)
        res.status(500)
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
  