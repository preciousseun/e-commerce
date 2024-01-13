const express = require('express');

const router = express.Router();

const {stripePayment} = require('../controllers/stripeController');

router.post("/payment", stripePayment)

module.exports = router;