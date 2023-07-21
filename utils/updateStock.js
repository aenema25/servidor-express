const { productService } = require("../services")

const updateProductStock = async (productID, qtyToPurchase) => {
    console.log("entro a esta madre ?")
    const product = await productService.getOne(productID)
    if (product && product.stock > qtyToPurchase) {
        const query = {
            $set:
            {
                stock: product.stock - qtyToPurchase,
            }
        }
        const updateProduct = await productService.update(productID, query)
        if (updateProduct) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

module.exports = { updateProductStock }