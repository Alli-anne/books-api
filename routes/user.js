const controllers = require('../controllers/userContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');


router.get("/user", controllers.getAllUsers);
router.get("user/:id", controllers.getUserID);
router.post("/user", controllers.addUser);
router.put("/user/:id", controllers.updateUser);
router.delete("/user/:id", controllers.deleteUser);

module.exports = router;

