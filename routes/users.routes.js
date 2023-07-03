const express = require('express');
const router = express.Router();
const users_controller = require("../controllers/users.controller");
const passport = require('passport');


/* Put products in cart. */
router.post('/login', users_controller.login);

/* Put products qty in cart. */
router.post('/signup', users_controller.signup);

router.get('/current', passport.authenticate('jwt', { session: false }), users_controller.current)

module.exports = router;