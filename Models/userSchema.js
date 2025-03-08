const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number,
    otp : {
        type : Number,
        default : 0
    }
})

const MyModel = mongoose.model('User', userSchema);

module.exports = MyModel