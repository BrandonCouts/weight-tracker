const router = require('express').Router();
const foodItemsController = require('../controllers/foodItemsController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, foodItemsController.list);
router.post('/', verifyToken, foodItemsController.create);

module.exports = router;
