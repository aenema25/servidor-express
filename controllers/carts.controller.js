const { cartService, ticketsService } = require('../services');
const { updateProductStock } = require('../utils/updateStock');
const crypto = require("crypto");


exports.get_cart_by_id = async (req, res) => {
    const isUser = req.user.role === 'user' || req.user.role === 'premium'
    if (isUser) {
        if (req.user.user.cartID === req.params.cid) {
            const cart = await cartService.get(req.params.cid)
            if (cart) {
                res.status(200).send({
                    status: "success",
                    cart: cart
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Ocurrio un error, intenta nuevamente",
                    cart: ''
                })
            }
        } else {
            res.status(400).send({
                status: "error",
                message: "El carro que estas tratando de obtener no corresponde a tu usario, intentalo nuevamente",
                cart: ''
            })
        }
    } else {
        res.status(401).send({
            error: "unauthorized",
        })
    }
}
exports.modify_or_create_cart = async (req, res) => {
    const isUser = req.user.role === 'user' || req.user.role === 'premium'
    if (isUser) {
        const cart = await cartService.get(req.params.cid)
        if (cart) {
            const updatedQTY = cart.products.map((product) => {
                req.body.productList.forEach((bodyProduct) => {
                    if (product.id === bodyProduct.id)
                        product.qty = product.qty + bodyProduct.qty
                })
                return product
            })

            const filteredBodyProduct = req.body.productList.map((bodyProduct) => {
                const alreadyInCartProduct = cart.products.map(product => product.id)
                if (!alreadyInCartProduct.some(id => id === bodyProduct.id))
                    return bodyProduct
            }).filter(item => item);

            const update = { products: [...updatedQTY, ...filteredBodyProduct], clientName: req.user.user.fullName }
            const cartUpdated = await cartService.update(req.params.cid, update)
            if (cartUpdated) {
                res.status(200).send({
                    status: "success",
                    message: "Carro de compras creado con exito",
                    cart: cart
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Ocurrio un error, intenta nuevamente",
                    cart: ''
                })
            }
        } else {
            const newCart = await cartService.create(req.body.productList, req.params.cid, req.user.user.fullName)
            if (newCart) {
                res.status(200).send({
                    status: "success",
                    message: "Carro de compras actualizado con exito",
                    cart: newCart
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Ocurrio un error, intenta nuevamente",
                    cart: ''
                })
            }
        }
    } else {
        res.status(401).send({
            error: "unauthorized",
        })
    }

}


exports.delete_cart = async (req, res) => {
    const isUser = req.user.role === 'user' || req.user.role === 'premium'
    if (isUser) {
        const deleteCart = await cartService.delete(req.params.cid)
        if (deleteCart) {
            res.status(200).send({
                status: "success",
                message: "Carrito eliminado con exito"
            })
        } else {
            res.status(400).send({
                status: "error",
                message: "Ocurrio un error, intenta nuevamente"
            })
        }
    } else {
        res.status(401).send({
            error: "unauthorized",
        })
    }
}

exports.finish_purchase = async (req, res) => {
    const isUser = req.user.role === 'user' || req.user.role === 'premium'
    if (isUser) {
        const cart = await cartService.get(req.params.cid)
        console.log(cart)
        if (cart) {
            const products = cart.products
            const finalProducts = []
            const finalProductsFetch = products.map(async (product) => {
                const canUpdateStock = await updateProductStock(product.id, product.qty)
                if (canUpdateStock) finalProducts.push(product)
            })

            await Promise.allSettled(finalProductsFetch)

            const newTicket = await ticketsService.create({
                code: crypto.randomBytes(16).toString("hex"),
                purchase_datetime: new Date().toISOString(),
                amount: finalProducts.map((product) => product.qty * product.price).reduce((prev, current) => prev + current, 0),
                purchaser: req.user.user.fullName,
                detail: finalProducts
            })
            if (newTicket) {
                const query = {
                    $set:
                    {
                        products: [],
                    }
                }

                await cartService.update(req.params.cid, query)

                res.status(200).send({
                    status: "success",
                    message: "Compra realizada con exito",
                    resume: newTicket
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Ocurrio un error, intenta nuevamente"
                })
            }
        } else {
            res.status(400).send({
                status: "error",
                message: "Ocurrio un error, intenta nuevamente"
            })
        }
    } else {
        res.status(401).send({
            error: "unauthorized",
        })
    }
} 