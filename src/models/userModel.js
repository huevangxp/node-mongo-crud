const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: String,
    lastName: {
        type: String,
    },
    age: Number,
    tell:String,
    status: {
        type: String,
        require: true
    },
    

},{timestamps: true})


module.exports = mongoose.model('users information', userSchema)