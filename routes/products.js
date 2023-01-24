const express = require('express');
const ProductsClass = require('../utils/ProductManager');
const router = express.Router();

/* GET products. */
router.get('/products', function (req, res, next) {
  res.send(ProductsClass.getProducts().slice(0, req.query.limit))
});
/* POST product (create a product). */
router.post('/products', function (req, res, next) {

  const addProduct = ProductsClass.addProducts(req.body)
  if (addProduct.error) {
    res.status(400).send(addProduct.mensaje)
  } else {
    res.status(200).send(addProduct.mensaje)
  }

});
/* PUT product (update a product). */
router.put('/products/:id', function (req, res, next) {
  const updateProduct = ProductsClass.updateProductById(req.params.id, req.body)
  if (updateProduct.error) {
    res.status(400).send(updateProduct.mensaje)
  } else {
    res.status(200).send(updateProduct.mensaje)
  }

});
/* GET products by id. */
router.get('/products/:id', function (req, res, next) {
  res.send({
    productos: ProductsClass.getProductById(req.params.id)
  })
});

/* DELETE products by id. */
router.delete('/products/:id', function (req, res, next) {
  const deleteProduct = ProductsClass.deleteProductById(req.params.id)
  if (deleteProduct.error) {
    res.status(400).send(deleteProduct.mensaje)
  } else {
    res.status(200).send(deleteProduct.mensaje)
  }
});

module.exports = router;