const { createRandomProduct } = require("../utils/mockGenerator")
const {logger }= require('../config/winston.config')

exports.generate_100_random_products = (req, res) => {
    const mockProducts = []

    for (let i = 0; i < 100; i++) {
        mockProducts.push(createRandomProduct(i))
    }
    res.status(200).send({
        mockProducts: mockProducts
    })
}

exports.mocks_logger = (req, res) => {
    logger.log('error','Logger error example')
    logger.log('warn','Logger warning example')
    logger.log('info','Logger information example')
    logger.log('http','Logger http example')
    logger.log('verbose','Logger verbose example')
    logger.log('debug','Logger debug example')
    res.status(200).send({ msg: 'logger Test' });
}


