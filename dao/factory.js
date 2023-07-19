const userMemoryDao = require("./memory/user.dao")
const userMongoDao = require("./mongo/user.dao")
const cartMemoryDao = require("./memory/cart.dao")
const cartMongoDao = require("./mongo/cart.dao")
const productMemoryDao = require("./memory/product.dao")
const productMongoDao = require("./mongo/product.dao")
const ticketsMongoDao = require("./mongo/tickets.dao")
const ticketsMemoryDao = require("./memory/tickets.dao")


const persistence = process.env.PERSISTENCE ?? 'mongo'

const userManager = persistence == 'mongo' ? userMongoDao : userMemoryDao
const cartManager = persistence == 'mongo' ? cartMongoDao : cartMemoryDao
const productManager = persistence == 'mongo' ? productMongoDao : productMemoryDao
const ticketManager = persistence == 'mongo' ? ticketsMongoDao : ticketsMemoryDao

module.exports = { userManager, cartManager, productManager, ticketManager }