class ProductService {
    constructor(manager) {
        this.manager = manager
    }
    getAll = (filters,options) => this.manager.getAll(filters,options)
    getOne = (id) => this.manager.getOne(id)
    create = (product)=> this.manager.create(product)
    update = (id,updatedProduct) => this.manager.update(id,updatedProduct)
    delete = (id) => this.manager.delete(id)
}

module.exports= ProductService