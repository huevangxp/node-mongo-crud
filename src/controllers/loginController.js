const auth = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.register = async (req, res) => {
    try {

        const { name, lastName, email, tell } = req.body

        const newPass = await bcrypt.hash(req.body.password, 10)
        console.log(newPass);

        const checkEmail = await auth.findOne({ email: req.body.email }).exec()
        if (checkEmail) {
            return res.status(404).json({ message: 'email already existed ...' })
        }
        const checkPhone = await auth.findOne({ tell: req.body.tell }).exec()
        console.log(checkPhone);
        if (checkPhone) {
            return res.status(404).json({ message: "phone number already existed ..." })
        }

        const register = new auth({
            name,
            lastName,
            email,
            tell,
            password: newPass
        })

        await register.save()

        res.status(200).json(register)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, tell, password } = req.body
    try {

        const isUser = await auth.findOne({ $or: [{ email: email }, { tell: tell }] })
        if (!isUser) {
            return res.status(404).json({ message: 'user not found' })
        }
        const isPass = await bcrypt.compare(password, isUser.password)
        if (!isPass) {
            return res.status(401).json({ message: 'Incorrect password...' })
        }
        const token = await jwt.sign({ userId: isUser._id }, process.env.secretKey, { expiresIn: '24h' })
        
        const newData = {
            email: isUser.email,
            tell: isUser.tell,
            token:token
       }
        res.status(200).json(newData)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}