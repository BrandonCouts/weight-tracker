const router = require('express').Router();
const weightsController = require('../controllers/weightsController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, weightsController.list);
router.post('/', verifyToken, weightsController.create);
router.put('/:id', verifyToken, weightsController.update);
router.delete('/:id', verifyToken, weightsController.remove);

module.exports = router;
