const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number
})

const MyModel = mongoose.model('xyz', userSchema);

module.exports = MyModel