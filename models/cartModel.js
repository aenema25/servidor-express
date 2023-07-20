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
    clientName: { 
        required: true,
        type: String
    }
})

module.exports = mongoose.model('cart', cartSchema)