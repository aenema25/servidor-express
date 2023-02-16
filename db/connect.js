const mongoose = require('mongoose');
const mongoString = process.env.ATLAS_URI;

mongoose.set('strictQuery', false)
mongoose.connect(mongoString);
const database = mongoose.connection;

module.exports = database