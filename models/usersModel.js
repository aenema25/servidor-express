const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

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
    }
})

usersSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('users', usersSchema)