require('dotenv').config();

console.log('=== PASSPORT CONFIG DEBUG ===');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'EXISTS' : 'MISSING');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'EXISTS' : 'MISSING');
console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);
console.log('============================');


const session = require('express-session');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { initDb } = require('./database/connect');
const bookRoutes = require('./routes/books.js');
const userRoutes = require('./routes/user.js');
const cors = require('cors');
const passport = require('passport'); 
require('./passportConfig');

// Session must come first
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Passport - BEFORE routes
app.use(passport.initialize());
app.use(passport.session());

// NOW your routes
app.use('/', bookRoutes);
app.use('/', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Remove this duplicate CORS (you have it twice)
// app.use(cors({...}));

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
