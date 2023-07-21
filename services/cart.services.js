class CartService {
    constructor(manager) {
        this.manager = manager
    }
    get = (id) => this.manager.get(id)
    create = (productList, cartID, clientName) => this.manager.create(productList, cartID, clientName)
    update = (cartdID, updatedData) => this.manager.update(cartdID, updatedData)
    delete = (cartID) => this.manager.delete(cartID)
}

module.exports = CartService