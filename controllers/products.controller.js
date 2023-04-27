const ProductModel = require('../models/productModel')
const ProductsClass = require('../utils/ProductManager');

exports.get_products = async (req, res) => {
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
}

exports.create_product_local = (req, res) => {
    const addProduct = ProductsClass.addProducts(req.body)
    if (addProduct.error) {
        res.status(400).send(addProduct.mensaje)
    } else {
        res.status(200).send(addProduct.mensaje)
    }
}

exports.update_product_local = (req, res) => {
    const updateProduct = ProductsClass.updateProductById(req.params.id, req.body)
    if (updateProduct.error) {
        res.status(400).send(updateProduct.mensaje)
    } else {
        res.status(200).send(updateProduct.mensaje)
    }
}

exports.get_product_by_id_local = (req, res) => {
    res.send({
        productos: ProductsClass.getProductById(req.params.id)
    })
}

exports.delete_product_local = (req, res) => {
    const deleteProduct = ProductsClass.deleteProductById(req.params.id)
    if (deleteProduct.error) {
        res.status(400).send(deleteProduct.mensaje)
    } else {
        res.status(200).send(deleteProduct.mensaje)
    }
}