const express = require('express');
const router = express.Router();

const products_controller = require("../controllers/products.controller")

/* GET products. */
router.get('/', products_controller.get_products);
/* POST product (create a product). */
router.post('/', products_controller.create_product_local);
/* PUT product (update a product). */
router.put('/:id', products_controller.update_product_local);
/* GET products by id. */
router.get('/:id', products_controller.get_product_by_id_local);
/* DELETE products by id. */
router.delete('/:id', products_controller.delete_product_local);

module.exports = router;