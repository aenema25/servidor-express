const express = require('express');
const CartModel = require('../models/cartModel');
const router = express.Router();

/* Put products in cart. */
router.put('/carts/:cid', async function (req, res, next) {
    const cart = await CartModel.find({ id: req.params.cid })
    const filter = { id: req.params.cid }
    const update = { products: [...cart.products, req.body.product] }
    const cartUpdated = await CartModel.findOneAndUpdate(filter, update);
    if (cartUpdated) {
        res.status(200).send({
            status: "success",
            message: "Producto(s) agregado(s) con exito al carrito"
        })
    } else {
        res.status(400).send({
            status: "error",
            message: "Ocurrio un error, intenta nuevamente"
        })
    }
});

/* Put products qty in cart. */
router.put('/carts/:cid/products/:pid', async function (req, res, next) {
    const cart = await CartModel.find({ id: req.params.cid })
    const updatedCart = cart.map((product) => {
        if (product.id === req.params.pid) {
            product.qty = product.qty + req.body.qty
        }
        return product
    })
    const filter = { id: req.params.cid }
    const update = { products: updatedCart }
    const cartUpdated = await CartModel.findOneAndUpdate(filter, update);
    if (cartUpdated) {
        res.status(200).send({
            status: "success",
            message: "Cantidad actualizada con exito"
        })
    } else {
        res.status(400).send({
            status: "error",
            message: "Ocurrio un error, intenta nuevamente"
        })
    }
});

/* DELETE product in cart. */
router.delete('/carts/:cid/products/:pid', async function (req, res, next) {
    const cart = await CartModel.find({ id: req.params.cid })
    const updatedCart = cart.map((product) => {
        if (product.id !== req.params.pid) {
            return product
        }
    })
    const filter = { id: req.params.cid }
    const update = { products: updatedCart }
    const cartUpdated = await CartModel.findOneAndUpdate(filter, update);
    if (cartUpdated) {
        res.status(200).send({
            status: "success",
            message: "Producto eliminado del carrito exitosamente"
        })
    } else {
        res.status(400).send({
            status: "error",
            message: "Ocurrio un error, intenta nuevamente"
        })
    }
});

/* DELETE whole cart. */
router.delete('/carts/:cid/products/:pid', async function (req, res, next) {
    const filter = { id: req.params.cid }
    const update = { products: [] }
    const cartUpdated = await CartModel.findOneAndUpdate(filter, update);
    if (cartUpdated) {
        res.status(200).send({
            status: "success",
            message: "Carrito vaciado con exito"
        })
    } else {
        res.status(400).send({
            status: "error",
            message: "Ocurrio un error, intenta nuevamente"
        })
    }
});


module.exports = router;