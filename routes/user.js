const userControllers = require('../controllers/userContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');
const middleware = require('../middleware/authMiddleware');
const passport = require('passport');


router.get("/user", userControllers.getAllUsers);
router.get("/user/:id", utils.validateId, userControllers.getUserID);
router.post("/user", userControllers.addUser);
router.put("/user/:id", utils.validateUser, utils.validateId, userControllers.updateUser);
router.delete("/user/:id", utils.validateId, userControllers.deleteUser);

router.get("/login", userControllers.login);

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), userControllers.googleAuthCallback);

module.exports = router;

