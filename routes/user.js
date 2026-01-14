const expess = require('express');
const userController = require('../controllers/user');

const router = expess.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;