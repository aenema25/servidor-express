const { productService } = require('../services');
const { ProductInsertDTO, ProductUpdateDTO } = require('../dto/product')

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
    try {
        const products = await productService.getAll(filters, options)
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
    } catch (e) {
        res.status(400).send({
            status: "error",
            message: "Ocurrio un error en el servidor",
            error: e
        })
    }
}

exports.get_product_by_id = async (req, res) => {
    if (req.params.id) {
        try {
            const product = await productService.getOne(req.params.id)
            if (product) {
                res.status(200).send({
                    status: "success",
                    product: product
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Producto no encontrado"
                })
            }
        } catch (e) {
            res.status(400).send({
                status: "error",
                message: "Ocurrio un error en el servidor",
                error: e
            })
        }
    } else {
        res.status(400).send({
            status: "error",
            message: "El campo 'id' viene vacio"
        })
    }
}

exports.create_product = async (req, res) => {
    if (req.body) {
        try {
            const productParsed = new ProductInsertDTO(req.body)
            const createdProduct = await productService.create(productParsed)
            if (createdProduct) {
                res.status(200).send({
                    status: "success",
                    product: createdProduct
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "No se pudo crear el producto"
                })
            }
        } catch (e) {
            res.status(400).send({
                status: "error",
                message: "Ocurrio un error en el servidor",
                error: e
            })
        }
    } else {
        res.status(400).send({
            status: "error",
            message: "Datos faltantes",
        })
    }
}

exports.update_product = async (req, res) => {
    if (Object.keys(req.body).length && req.params.id) {
        try {
            const updatedData = new ProductUpdateDTO(req.body)
            const updatedProduct = await productService.update(req.params.id, updatedData)
            if (updatedProduct) {
                res.status(200).send({
                    status: "success",
                    product: updatedProduct
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Producto no encontrado"
                })
            }
        } catch (e) {
            res.status(400).send({
                status: "error",
                message: "Ocurrio un error en el servidor",
                error: e
            })
        }

    } else {
        res.status(400).send({
            status: "error",
            message: "Datos faltantes",
        })
    }
}

exports.delete_product = async (req, res) => {
    if(req.params.id){
        try {
            const deletedProduct = await productService.delete(req.params.id)
            if (deletedProduct) {
                res.status(200).send({
                    status: "success",
                    product: deletedProduct
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Producto no encontrado"
                })
            }
        } catch (e) {
            res.status(400).send({
                status: "error",
                message: "'ID' no valido, contacta al administrador si crees que es un error",
                error: e
            })
        }
    }else {
        res.status(400).send({
            status: "error",
            message: "Datos faltantes",
        })
    }
}