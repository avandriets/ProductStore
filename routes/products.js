const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('', productsController.getProducts)
router.get('/:productId', productsController.getProduct)
router.post('', productsController.postProduct)
router.put('/:productId', productsController.putProduct)
router.delete('/:productId', productsController.deleteProduct)

module.exports = router;
