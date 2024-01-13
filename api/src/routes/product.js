const express = require('express');

const router = express.Router();

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../validation/verifyToken')

const {createProduct, updateProduct, getProduct, getAllProduct, deleteProduct} = require('../controllers/productController');

router.post('/', verifyTokenAndAdmin, createProduct);
router.put('/:id', verifyTokenAndAdmin, updateProduct);
router.get('/find/:id', getProduct);
router.get('/', getAllProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);



module.exports = router; 