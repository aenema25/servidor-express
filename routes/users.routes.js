const express = require('express');
const router = express.Router();
const users_controller = require("../controllers/users.controller");
const passport = require('passport');


/* Put products in cart. */
router.post('/login', users_controller.login);

/* Put products qty in cart. */
router.post('/signup', users_controller.signup);

router.get('/current', passport.authenticate('jwt', { session: false }), users_controller.current)

router.get('/github', passport.authenticate('github', { scope: ["user:email"] }), async (req, res) => { })

router.get('/githubcallback', passport.authenticate('github'), users_controller.github_callback)
/* GET all users */
router.get('/', users_controller.get_all_users)
/* DELETE all users that are inactive more than 2 days */
router.delete('/', users_controller.delete_inactive_users)

module.exports = router;