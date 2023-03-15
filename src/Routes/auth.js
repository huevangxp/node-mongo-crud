const authController = require('../controllers/authController')

module.exports = (app) => {
    app.get('/auth/users', authController.readUser)
    app.get('/auth/user/:id', authController.readOneUser)
    app.put('/auth/user/:id', authController.editUser)
    app.post('/auth/user', authController.createUser)
    app.delete('/auth/user/:id', authController.deleteUser)
}