const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        required: true,
        type: String,
    },
    age: Number,
    password: {
        required: true,
        type: String,
    },
    cart: {
        type: ObjectId,
        ref: 'cart'
    },
    rol: {
        required: false,
        type: String,
        default: "user"
    },
    cartID: {
        type: String
    },
    lastConnection: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('users', usersSchema)