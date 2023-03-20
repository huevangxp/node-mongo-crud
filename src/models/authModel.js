const mongoose = require('mongoose')

const authSchema = mongoose.Schema({

    name: String,
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    tell: String,
    password: {
        type: String,
        require:true
    }
    

},{timestamps: true})

module.exports = mongoose.model('auth', authSchema)