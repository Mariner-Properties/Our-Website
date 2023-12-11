require('dotenv').config();
const express = require('express');
// const uuid = require('./helpers/uuid');
// const routes = require('./controllers/ticketroutes');
const router = express.Router();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => 
res.render('../views/index.ejs')
);

router.get("/about", (req, res) => 
res.render('../views/about.ejs')
);

router.get("/application", (req, res) => 
res.render('../views/application.ejs')
);

router.get("/delafield", (req, res) => 
res.render('../views/delafield.ejs')
);

router.get("/Payment", (req, res) => 
res.render('../views/Payment.ejs')
);

router.get("/richardson", (req, res) => 
res.render('../views/richardson.ejs')
);

router.get("/senior", (req, res) => 
res.render('../views/senior.ejs')
);

  router.post('/delete-ticket/:id', async (req, res) => {
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
