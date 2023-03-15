const users = require('../models/userModel')

exports.createUser = async (req, res) => {
    try {
        const user = req.body
        const newUser = await users(user).save()
        if (newUser) {
            res.status(200).json(newUser)
        } else {
            console.log('create user error');
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.readUser = async (req, res) => {
    try {
        const userAll = await users.find({}).exec()
        if (userAll) {
            const filterUser = userAll.filter(data => data.age > 20)
            // res.status(200).json(filterUser)
            res.status(200).json(userAll)
        } else {
            console.log('create user error');
        }
        // res.status(200).json({message:'get all user'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.readOneUser = async (req, res) => {
    const userID = req.params.id
    try {
        // const oneUser = await users.findById( userID ).exec()
        const oneUser = await users.findOne( {_id: userID }).exec()
        if (oneUser) {
            res.status(200).json(oneUser)
        } else {
            res.status(404).json(error)
        }
        // res.status(200).json({message:'get one user'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.editUser = async (req, res) => {
    try {
        const userID = req.params.id
        const newData = await users.findOneAndUpdate({ _id: userID },req.body, {new:true}).exec()
        if (newData) {
          res.status(200).json(newData)  
        } else {
            res.status(404).json(error)
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.deleteUser = async (req, res) => {
    const userID = req.params.id
    try {
        const byeUser = await users.findOneAndRemove({_id: userID}).exec()
        if (byeUser) {
            res.status(200).json(byeUser)  
          } else {
              res.status(404).json(error)
          }
        // res.status(200).json({message:'delete user'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}