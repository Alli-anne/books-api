const controllers = require('../controllers/bookContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');


// Example GET
router.get('/books',   controllers.getAllBooks);
router.post('/test', utils.validateBook,controllers.addTestBook);
router.get('/books/:id', utils.validateBookId, controllers.getBookID);
router.put(
  '/books/:id',
  utils.validateBookId,   // checks ID first
  utils.validateBook,     // checks body fields
  controllers.updateBook
);

router.delete(
  '/books/:id',
  utils.validateBookId,   // only need ID check
  controllers.deleteBook
);

// Example P

module.exports = router;