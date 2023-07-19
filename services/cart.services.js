class CartService {
    constructor(manager) {
        this.manager = manager
    }
    get = (id) => this.manager.get(id)
    create = (productList, userId) => this.manager.create(productList, userId)
    update = (cartdID, updatedData) => this.manager.update(cartdID, updatedData)
    delete = (cartID) => this.manager.delete(cartID)
}

module.exports = CartService