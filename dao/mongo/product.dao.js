const { ObjectId } = require("mongodb")
const ProductModel = require("../../models/productModel")

class ProductManager {
    getAll = (filters, options) => ProductModel.paginate(filters, options)
    getOne = (id) => ProductModel.findOne({ "_id": new ObjectId(id) })
    create = (product) => ProductModel.create(product)
    update = (id, updatedProduct) => ProductModel.updateOne({ _id: new ObjectId(id) }, updatedProduct)
    delete = (id) => ProductModel.deleteOne({ _id: new ObjectId(id) })
}

module.exports = new ProductManager()