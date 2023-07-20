const express = require('express');
const router = express.Router();
const passport = require('passport');

const products_controller = require("../controllers/products.controller")

/* GET products. */
router.get('/', products_controller.get_products);
/* GET products by id. */
router.get('/:id', products_controller.get_product_by_id);
/* POST product (create a product). */
router.post('/create', passport.authenticate('jwt', { session: false }), products_controller.create_product);
/* PUT product (update a product). */
router.put('/:id', passport.authenticate('jwt', { session: false }), products_controller.update_product);
/* DELETE products by id. */
router.delete('/:id', passport.authenticate('jwt', { session: false }), products_controller.delete_product);

module.exports = router;