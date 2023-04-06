const express = require('express');
const router = express.Router();

const carts_controller = require("../controllers/carts.controller")

/* Put products in cart. */
router.put('/carts/:cid', carts_controller.put_product);

/* Put products qty in cart. */
router.put('/carts/:cid/products/:pid', carts_controller.put_product_qty);

/* DELETE product in cart. */
router.delete('/carts/:cid/products/:pid', carts_controller.delete_product);

/* DELETE whole cart. */
router.delete('/carts/:cid/products/:pid', carts_controller.delete_cart);


module.exports = router;