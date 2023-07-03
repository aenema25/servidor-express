class ProductInsertDTO {
    constructor(product) {
        this.id = 'MOCKLOCALID' // buscarle logica luego (memory/mongo)
        this.title = product.title
        this.description = product.description
        this.price = product.price
        this.code = product.code
        this.stock = product.stock
        this.status = product.status
        this.category = product.category ?? "uncategorized"
        this.thumbnails = product.thumbnails ?? []
    }
}

class ProductUpdateDTO {
    constructor(product) {
        if (product.id) this.id = 'MOCKLOCALID' // buscarle logica luego (memory/mongo)
        if (product.title) this.title = product.title
        if (product.description) this.description = product.description
        if (product.price) this.price = product.price
        if (product.code) this.code = product.code
        if (product.stock) this.stock = product.stock
        if (product.status) this.status = product.status
        if (product.category) this.category = product.category ?? "uncategorized"
        if (product.thumbnails) this.thumbnails = product.thumbnails ?? []
    }
}

module.exports = {
    ProductInsertDTO,
    ProductUpdateDTO
}