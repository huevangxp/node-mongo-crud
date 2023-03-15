const mongoose = require('mongoose')
require('dotenv').config()

const Conn = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log('Conneted database...');
    } catch (error) {
        return console.log(error);
    }
}

module.exports = Conn