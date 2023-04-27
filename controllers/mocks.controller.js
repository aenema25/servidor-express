const { createRandomProduct } = require("../utils/mockGenerator")

exports.generate_100_random_products = (req, res) => {
    const mockProducts = []

    for (let i = 0; i < 100; i++) {
        mockProducts.push(createRandomProduct(i))
    }
    res.status(200).send({
        mockProducts: mockProducts
    })
}


