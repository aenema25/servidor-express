const express = require('express');
const router = express.Router();
const passport = require("passport")

/* GET products. */
router.get('/', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get('/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
});

module.exports = router;