const userControllers = require('../controllers/userContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');


router.get("/user", userControllers.getAllUsers);
router.get("/user/:id", utils.validateId, userControllers.getUserID);
router.post("/user", userControllers.addUser);
router.put("/user/:id", utils.validateUser, utils.validateId, userControllers.updateUser);
router.delete("/user/:id", utils.validateId, userControllers.deleteUser);

module.exports = router;

