class CreateCartDTO {
    constructor(productList, cartID, clientName) {
        this.id = cartID
        this.products = productList
        this.clientName = clientName
    }
}

module.exports = CreateCartDTO