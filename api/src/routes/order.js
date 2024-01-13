const express = require('express');

const router = express.Router();

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../validation/verifyToken')

const {createOrder, updateOrder, getOrder, getAllOrder, getIncome, deleteOrder} = require('../controllers/orderController');

router.post('/', verifyToken, createOrder);
router.put('/:id', verifyTokenAndAdmin, updateOrder);
router.get('/find/:userId', verifyTokenAndAdmin, getOrder);
router.get('/', verifyTokenAndAdmin, getAllOrder);
router.get('/income', verifyTokenAndAdmin, getIncome);
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);


module.exports = router;