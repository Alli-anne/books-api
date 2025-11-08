const userControllers = require('../controllers/userContoller.js');
const express = require('express');
const router = express.Router();
const utils = require('../validation/utils');
const middleware = require('../middleware/authMiddleware');
const passport = require('passport');


router.get("/user", userControllers.getAllUsers);
router.get("/user/:id", utils.validateId, userControllers.getUserID);
router.post("/user", middleware.ensureAuthenticated, userControllers.addUser);
router.put("/user/:id",   middleware.ensureAuthenticated, utils.validateUser, utils.validateId, userControllers.updateUser);
router.delete("/user/:id",  middleware.ensureAuthenticated, utils.validateId, userControllers.deleteUser);


router.get("/login", userControllers.login);

router.get("/logout",  middleware.ensureAuthenticated, userControllers.logout);

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
 passport.authenticate('google', { failureRedirect: '/login' }),
 (req, res) => {
     res.json({ message: 'Login successful!' });
 }
);


module.exports = router;

