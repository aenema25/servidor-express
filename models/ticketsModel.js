const mongoose = require('mongoose');

const ticketsSchema = new mongoose.Schema({
    code: {
        required: true,
        type: String
    },
    purchase_datetime: {
        required: true,
        type: String,
    },
    amount: {
        required: true,
        type: Number,
    },
    purchaser: {
        required: true,
        type: String
    },
    detail: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('tickets', ticketsSchema)