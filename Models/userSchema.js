const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number
})

const MyModel = mongoose.model('User', userSchema);

module.exports = MyModel