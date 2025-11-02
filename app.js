require('dotenv').config();
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

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// app.use('/api/contacts', contactRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use('/', bookRoutes);
app.use('/', userRoutes);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
