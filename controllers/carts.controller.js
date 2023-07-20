const { cartService } = require('../services');

exports.modify_or_create_cart = async (req, res) => {
    const isUser = req.user.role === 'user' || req.user.role === 'premium'
    if (isUser) {
        const cart = await cartService.get(req.params.cartID)
        if (cart) {
            const update = { products: [...cart.products, req.body.productList] }
            const cartUpdated = await cartService.update(req.params.cartID, update)
            if (cartUpdated) {
                res.status(200).send({
                    status: "success",
                    message: "Carro de compras actualizado con exito",
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
            const newCart = await cartService.create(req.body.productList, req.body.userID)
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
        const deleteCart = await cartService.delete(req.params.cartID)
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

} 