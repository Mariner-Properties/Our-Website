const express = require('express');
const { Ticket } = require('../models/ticket');
const router = express.Router();
const nodemailer = require('nodemailer')

const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rpgillooly@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

const requireLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.redirect('/login'); // Redirect to your login page
    }
};

router.get('/admin-panel', requireLogin, async (req, res) => {
    try {
      const tickets = await Ticket.findAll();
      res.render('adminPanel', { tickets });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

router.get('/delete-ticket/:id', async (req, res) => {
    const ticketId = req.params.id;
  
    try {
      // Find the ticket by ID
      const ticket = await Ticket.findByPk(ticketId);
  
      if (!ticket) {
        return res.status(404).send('Ticket not found');
      }
  
      // Delete the ticket
      await ticket.destroy();
  
      // Redirect to the admin panel or another page
      res.redirect('/admin-panel');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting ticket');
    }
  });

module.exports = router;
