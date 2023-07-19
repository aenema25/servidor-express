const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    products: {
        required: false,
        type: Array,
        default: []
    },
    userId: {
        required: false,
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('cart', cartSchema)