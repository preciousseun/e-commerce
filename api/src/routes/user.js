const express = require('express');

const router = express.Router();

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../validation/verifyToken')

const {updateUser, deleteUser, getUser, getAllUser, getStats} = require('../controllers/userController');

router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.get('/find/:id', verifyTokenAndAdmin, getUser);
router.get('/', verifyTokenAndAdmin, getAllUser);
router.get('/stats', verifyTokenAndAdmin, getStats);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);



module.exports = router;