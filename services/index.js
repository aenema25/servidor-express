const { cartManager, productManager, userManager, ticketManager } = require("../dao/factory")
const CartService = require("./cart.services")
const ProductService = require("./product.service")
const TicketsService = require("./tickets.service")
const UserService = require("./user.service")

const userService = new UserService(userManager)
const productService = new ProductService(productManager)
const cartService = new CartService(cartManager)
const ticketsService = new TicketsService(ticketManager)

module.exports = { productService, userService, cartService, ticketsService }