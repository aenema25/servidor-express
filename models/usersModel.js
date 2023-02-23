const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const usersSchema = new mongoose.Schema({
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    name:{
        required: true,
        type:String
    },
    lastName: {
        required: true,
        type: String
    },
    rol: {
        required: false,
        type: String,
        default: "usuario"
    }
})

usersSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('users', usersSchema)