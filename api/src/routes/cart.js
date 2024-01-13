const express = require('express');

const router = express.Router();

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../validation/verifyToken')

const {createCart, updateCart, getCart, getAllCart, deleteCart} = require('../controllers/cartController');

router.post('/', verifyToken, createCart);
router.put('/:id', verifyTokenAndAuthorization, updateCart);
router.get('/find/:userId', verifyTokenAndAuthorization, getCart);
router.get('/', verifyTokenAndAdmin, getAllCart);
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);



module.exports = router;