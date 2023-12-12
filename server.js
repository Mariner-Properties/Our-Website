require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const staticroutes = require('./controllers/staticroutes');
const ticketroutes = require('./controllers/ticketroutes');
const adminroutes = require('./controllers/adminroutes');
const applicationroutes = require('./controllers/applicationroutes');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'shannonandryan30', // Change this to a secure secret
  resave: false,
  saveUninitialized: true,
}));

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication (replace this with your actual authentication logic)
  if (username === 'admin' && password === 'shannonandryan30') {
    req.session.userId = 1;
    res.redirect('/admin-panel'); // Redirect to the admin panel after successful login
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});


app.use(staticroutes);
app.use(ticketroutes);
app.use(adminroutes);
app.use(applicationroutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
