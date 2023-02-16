const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const cartSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    products: {
        required: false,
        type: Array,
        default: []
    }
})

cartSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('products', cartSchema)