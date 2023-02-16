const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    code: {
        required: true,
        type: String
    },
    stock: {
        required: true,
        type: Number,
    },
    status: {
        required: true,
        type: Boolean
    },
    category: {
        required: false,
        type: String,
        default: "uncategorized"
    },
    thumbnails: {
        required: false,
        type: Array,
        default: []
    }
})

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('products', productSchema)