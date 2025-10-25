const controllers = require('../controllers/bookContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');


// Example GET
router.get('/books',  controllers.getAllBooks);
router.post('/test', utils.errorHandler,controllers.addTestBook);
router.get('/books/:id', utils.errorHandler, controllers.getBookID);
router.put('/books/:id',   utils.errorHandler, controllers.updateBook);
router.delete('/books/:id',   utils.errorHandler, controllers.delteBook);


// Example P

module.exports = router;