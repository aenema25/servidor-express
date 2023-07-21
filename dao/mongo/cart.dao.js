const CreateCartDTO = require("../../dto/cart")
const cartModel = require("../../models/cartModel")

class CartManager {
    get = (id) => cartModel.findOne({ id: id })
    create = (productList, cartID, clientName) => cartModel.create(new CreateCartDTO(productList, cartID, clientName))
    update = (cartdID, updatedData) => cartModel.updateOne({ id: cartdID }, updatedData)
    delete = (cartID) => cartModel.deleteOne({ id: cartID })
}

module.exports = new CartManager()