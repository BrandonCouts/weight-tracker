const router = require('express').Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, userController.get);
router.put('/', verifyToken, userController.update);

module.exports = router;
