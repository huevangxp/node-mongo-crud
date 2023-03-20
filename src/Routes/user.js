const controller = require('../controllers/loginController')

module.exports = (app) => {
    app.post('/user-register', controller.register);
    app.post('/user-login', controller.login);
}