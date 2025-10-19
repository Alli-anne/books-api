const controllers = require('../controllers/bookContoller.js');
const express = require('express');
const router = express.Router();


// Example GET
router.get('/books', controllers.getAllBooks);
router.post('/test', controllers.addTestBook);
router.get('/books/:id', controllers.getBookID);
router.put('/books/:id', controllers.updateBook);
router.delete('/books/:id', controllers.delteBook);


// Example P

module.exports = router;