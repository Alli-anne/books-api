// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books API',
    description: 'A simple API for managing books',
  },
  host: 'books-api-8sff.onrender.com',
  schemes: ['http'],
};

const outputFile = './swagger.json'; // this will be generated
const endpointsFiles = ['./routes/books.js']; // adjust path if your routes differ

swaggerAutogen(outputFile, endpointsFiles, doc);