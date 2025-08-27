const router = require('express').Router();
const errorController = require('../controllers/errorController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.get('/', verifyToken, requireAdmin, errorController.getLog);

module.exports = router;
