const express = require('express');
const router = express.Router();
const passport = require('passport');

const carts_controller = require("../controllers/carts.controller")

/* GET user cart by id */
router.get('/:cid', passport.authenticate('jwt', { session: false }), carts_controller.get_cart_by_id)

/* Create or modify cart product. */
router.post('/:cid', passport.authenticate('jwt', { session: false }), carts_controller.modify_or_create_cart);

/* DELETE whole cart. */
router.delete('/:cid', passport.authenticate('jwt', { session: false }), carts_controller.delete_cart);

/* POST Finish purchase */
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), carts_controller.finish_purchase)

module.exports = router;