const crypto = require("crypto");

class CreateCartDTO {
    constructor(productList,userId) {
        this.id = `CART-${userId ?? crypto.randomBytes(3*4).toString('base64')}`
        this.products = productList
    }
}

module.exports = CreateCartDTO