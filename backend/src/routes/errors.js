const router = require('express').Router();
const errorController = require('../controllers/errorController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.get('/', verifyToken, requireAdmin, errorController.getLog);
router.delete('/', verifyToken, requireAdmin, errorController.deleteLog);

module.exports = router;
