const express = require('express');
const router = express.Router();
const passport = require('passport');

const carts_controller = require("../controllers/carts.controller")

/* Create or modify cart product. */
router.put('/cart/:cid', passport.authenticate('jwt', { session: false }), carts_controller.modify_or_create_cart);

/* DELETE whole cart. */
router.delete('/cart/:cid', passport.authenticate('jwt', { session: false }), carts_controller.delete_cart);

/* POST Finish purchase */
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), carts_controller.finish_purchase)

module.exports = router;