const express = require('express');
const router = express.Router();
const users_controller = require("../controllers/users.controller")


/* Put products in cart. */
router.post('/login', users_controller.login);

/* Put products qty in cart. */
router.post('/signup', users_controller.signup);

module.exports = router;