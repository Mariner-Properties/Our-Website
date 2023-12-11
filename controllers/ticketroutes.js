// controllers/ticketroutes.js
require('dotenv').config();
const express = require('express');
const { Ticket } = require('../models/ticket'); // Adjust the path based on your project structure
const router = express.Router();
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rpgillooly@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Create a new ticket
router.get('/submit-ticket', (req, res) => {
    res.render('ticketSubmit'); // Use your view engine (EJS, Pug, etc.)
});

// Route to handle form submission
router.post('/submit-ticket', async (req, res) => {
    try {
        // Create a new ticket using the data from the form
        const newTicket = await Ticket.create({
            title: req.body.title,
            property: req.body.property,
            problemDescription: req.body.problemDescription,
            dateNoticed: req.body.dateNoticed,
            todaysDate: req.body.todaysDate,
        });

    // Send email to a series of email addresses
    const emailAddresses = ['john.gillooly@irr.com', 'rpgillooly@gmail.com']; // Add your email addresses
    const subject = 'New Ticket Created On MarinerPropertiesRental.com!';
    const text = `A new ticket has been created:\nTitle: ${newTicket.title}\nProperty: ${newTicket.property}\nDescription: ${newTicket.problemDescription}\n`;

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
        res.redirect('/tickets');
    } catch (error) {
        // Handle errors (e.g., render an error page)
        res.status(500).render('error', { error });
    }
});

// Get all tickets
router.get('/tickets', async (req, res) => {
  try {
    // Exclude the 'id' field from the SELECT statement
    const tickets = await Ticket.findAll({
      attributes: ['title', 'property', 'problemDescription', 'dateNoticed', 'todaysDate', 'createdAt', 'updatedAt'],
    });

    res.render('submitted', { tickets }); // Pass the tickets data to the EJS template
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
