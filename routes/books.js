const controllers = require('../controllers/bookContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');
const middleware = require('../middleware/authMiddleware');



// Example GET
router.get('/books', ensureAuthenticated, controllers.getAllBooks);
router.post('/test', utils.validateBook,controllers.addTestBook);
router.get('/books/:id', utils.validateId, controllers.getBookID);
router.put('/books/:id', 
    utils.validateBook,
     utils.validateId, 
     controllers.updateBook);
router.delete('/books/:id',   
    utils.validateId, 
    controllers.deleteBook);


// Example P
module.exports = router;