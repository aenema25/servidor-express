const { cartManager, productManager, userManager } = require("../dao/factory")
const CartService = require("./cart.services")
const ProductService = require("./product.service")
const UserService = require("./user.service")

const userService = new UserService(userManager)
const productService = new ProductService(productManager)
const cartService = new CartService(cartManager)

module.exports = { productService, userService, cartService }