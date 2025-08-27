const router = require('express').Router();
const foodsController = require('../controllers/foodsController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, foodsController.list);
router.post('/', verifyToken, foodsController.create);
router.put('/:id', verifyToken, foodsController.update);
router.delete('/:id', verifyToken, foodsController.remove);

module.exports = router;
