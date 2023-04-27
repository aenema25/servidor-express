const express = require('express');
const router = express.Router();
const mocks_controller = require("../controllers/mocks.controller")

/* GET Generate a random 100 products */
router.get('/products', mocks_controller.generate_100_random_products);

module.exports = router;