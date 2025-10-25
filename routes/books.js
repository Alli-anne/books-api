const controllers = require('../controllers/bookContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');


// Example GET
router.get('/books',   controllers.getAllBooks);
router.post('/test', utils.missingString,controllers.addTestBook);
router.get('/books/:id', utils.missingString, controllers.getBookID);
router.put('/books/:id',   utils.missingString, controllers.updateBook);
router.delete('/books/:id',   utils.missingString, controllers.delteBook);


// Example P

module.exports = router;