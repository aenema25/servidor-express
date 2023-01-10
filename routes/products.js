const express = require('express');
const  ProductsClass  = require('../utils/ProductManager');
const router = express.Router();

/* GET products. */
router.get('/products', function(req, res, next) {
  res.send({
    productos: ProductsClass.getProducts().slice(0, req.query.limit)
  })
});
/* GET products by id. */
router.get('/products/:id', function(req, res, next) {
  console.log(req.params.id)
  res.send({
    productos: ProductsClass.getProductById(req.params.id)
  })
});

module.exports = router;