const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('../api/config/config')
const cors = require('cors')


connectDB()
app.use(express.json())

const authRoute = require('./src/routes/auth')
const userRoute = require('./src/routes/user')
const productRoute = require('./src/routes/product')
const cartRoute = require('./src/routes/cart')
const orderRoute = require('./src/routes/order')
const stripeRoute = require('./src/routes/stripe')

app.use(cors())
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`)
})