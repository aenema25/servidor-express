const CreateCartDTO = require("../../dto/cart")
const cartModel = require("../../models/cartModel")

class CartManager {
    get = (id) => cartModel.findOne({ id: id })
    create = (productList, userId) => cartModel.create(CreateCartDTO(productList, userId))
    update = (cartdID, updatedData) => cartModel.updateOne({ id: cartdID }, updatedData)
    delete = (cartID) => cartModel.deleteOne({ id: cartID })
}

module.exports = new CartManager()