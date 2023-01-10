const fs = require("fs")

const writeToFile = (file, data) => fs.writeFileSync(file, data)

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        // Verifica si existe el archivo, si existe obtiene los datos sino crea el archivo
        const fileExist = fs.existsSync(this.path)
        if (fileExist) {
            const productsFromFile = fs.readFileSync(this.path)
            this.products = JSON.parse(productsFromFile)
            console.log("El archivo ya existia")
        } else {
            fs.writeFileSync(this.path, '[]')
        }
    }
    getProducts() {
        return this.products
    }
    addProducts(title, description, price, thumbnail, code, stock) {
        if (this.products.some((product) => product.code === code)) {
            return "El codigo ingresado ya existe"
        } else if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined) {
            return "Uno o mas campos estan vacios"
        } else {
            this.products.push({
                id: `PC-${this.products.length + 1 < 9 ? `0${this.products.length + 1}` : this.products.length + 1}`,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            })
            writeToFile(this.path, JSON.stringify(this.products))
            return "Producto Agregado exitosamente"
        }
    }
    getProductById(id) {
        const product = this.products.find((product) => product.id === id)
        if (product !== undefined) {
            return product
        } else {
            return "El codigo de producto es invalido o no existe"
        }
    }
    updateProductById(id, updatedData) {
        const product = this.products.find((product) => product.id === id)
        if (product !== undefined && updatedData) {
            // Actualizando solo los datos que ya existen del producto
            product.title = updatedData.title ?? product.title
            product.description = updatedData.description ?? product.description
            product.price = updatedData.price ?? product.price
            product.thumbnail = updatedData.thumbnail ?? product.thumbnail
            product.code = updatedData.code ?? product.code
            product.stock = updatedData.stock ?? product.stock
            // Guardar cambios en el archivo
            writeToFile(this.path, JSON.stringify(this.products))
            return "Producto actualizado con exito", product
        } else {
            return "El codigo de producto es invalido o no existe"
        }
    }
    deleteProductById(id) {
        const product = this.products.find((product) => product.id === id)
        if (product !== undefined) {
            this.products = this.products.filter((product) => product.id !== id)
            writeToFile(this.path, JSON.stringify(this.products))
            return "Producto eliminado con exito", this.products
        } else {
            return "El codigo de producto es invalido o no existe"
        }
    }
}

const ProductsClass = new ProductManager("./data.json")

module.exports = ProductsClass