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
    addProducts(data) {
        if (this.products.some((product) => product.code === data.code)) {
            return {
                error: true,
                mensaje: "El codigo ingresado ya existe"
            }
        } else if (typeof data.title !== 'string' ||
            typeof data.description !== 'string' ||
            typeof data.price !== 'number' ||
            typeof data.code !== 'string' ||
            typeof data.stock !== 'number' ||
            typeof data.status !== 'boolean') {
            return {
                error: true,
                mensaje: "Uno o mas campos estan vacios o incorrectos, verifica e intenta nuevamente"
            }
        } else {
            this.products.push({
                id: `PC-${this.products.length + 1 < 9 ? `0${this.products.length + 1}` : this.products.length + 1}`,
                title: data.title,
                description: data.description,
                price: data.price,
                code: data.code,
                stock: data.stock,
                status: data.status ? data.status : true,
                category: data.category,
                thumbnails: data.thumbnails.length > 0 ? data.thumbnails : []
            })
            writeToFile(this.path, JSON.stringify(this.products))
            return {
                error: false,
                mensaje: "Producto Agregado exitosamente"
            }
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
            product.thumbnails = updatedData.thumbnail ?? product.thumbnail
            product.code = updatedData.code ?? product.code
            product.stock = updatedData.stock ?? product.stock
            product.category = updatedData.category ?? product.category
            product.status = updatedData.status ?? product.status
            // Guardar cambios en el archivo
            writeToFile(this.path, JSON.stringify(this.products))
            return {
                error: false,
                mensaje: "Producto actualizado con exito"
            }
        } else {
            return {
                error: true,
                mensaje: "El codigo de producto es invalido o no existe"
            }
        }
    }
    deleteProductById(id) {
        const product = this.products.find((product) => product.id === id)
        if (product !== undefined) {
            this.products = this.products.filter((product) => product.id !== id)
            writeToFile(this.path, JSON.stringify(this.products))
            return {
                error: false,
                mensaje: "Producto eliminado con exito"
            }
        } else {
            return {
                error: true,
                mensaje: "El codigo de producto es invalido o no existe"
            }
        }
    }
}

const ProductsClass = new ProductManager("./utils/data.json")

module.exports = ProductsClass