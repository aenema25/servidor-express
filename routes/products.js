const express = require('express');
const ProductsClass = require('../utils/ProductManager');
const router = express.Router();
const ProductModel = require('../models/productModel')

/* GET products. */
router.get('/', async function (req, res, next) {
  const customLabel = {
    totalDocs: false,
    docs: "payload",
    limit: false,
    page: 'page',
    nextPage: 'nextPage',
    prevPage: 'prevPage',
    totalPages: 'totalPages',
    hasNextPage: 'hasNextPage',
    hasPrevPage: 'hasPrevPage',
    pagingCounter: false,
    meta: false
  }
  const options = {
    ...(req.query.limit && {
      limit: req.query.limit
    }),
    ...(req.query.page && {
      page: req.query.page
    }),
    ...(req.query.sort && {
      sort: {
        price: req.query.sort 
      }
    }),
    customLabels: customLabel
  }

  const filters = {
    ...(req.query.category && {
      category: req.query.category
    })
  }

  const products = await ProductModel.paginate(filters, options)
  if (products) {
    res.status(200).send({
      status: "success",
      ...products
    })

  } else {
    res.status(400).send({
      status: "error",
      ...products
    })

  }

});
/* POST product (create a product). */
router.post('/', function (req, res, next) {

  const addProduct = ProductsClass.addProducts(req.body)
  if (addProduct.error) {
    res.status(400).send(addProduct.mensaje)
  } else {
    res.status(200).send(addProduct.mensaje)
  }

});
/* PUT product (update a product). */
router.put('/:id', function (req, res, next) {
  const updateProduct = ProductsClass.updateProductById(req.params.id, req.body)
  if (updateProduct.error) {
    res.status(400).send(updateProduct.mensaje)
  } else {
    res.status(200).send(updateProduct.mensaje)
  }

});
/* GET products by id. */
router.get('/:id', function (req, res, next) {
  res.send({
    productos: ProductsClass.getProductById(req.params.id)
  })
});

/* DELETE products by id. */
router.delete('/:id', function (req, res, next) {
  const deleteProduct = ProductsClass.deleteProductById(req.params.id)
  if (deleteProduct.error) {
    res.status(400).send(deleteProduct.mensaje)
  } else {
    res.status(200).send(deleteProduct.mensaje)
  }
});

module.exports = router;