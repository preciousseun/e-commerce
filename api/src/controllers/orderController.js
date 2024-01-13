const Order = require('../models/Order')


//CREATE
const createOrder = async (req, res, next) => {

    try {

        const newOrder = await Order.create(req.body)
        newOrder.save()

        res.status(201).json({
            success: true,
            message: 'Order Created',
            data: newOrder
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Unable to create Order",
            data: error
        });
    }
}

// UPDATE ORDER
const updateOrder = async (req, res, next) => {

    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json({
            success: true,
            message: 'Successfully updated cart',
            data: updatedOrder
        })

    } catch(error){
        res.status(403).json({
            success: false,
            message: 'Unable to update cart, something went wrong',
            data: error
        })
    }
}

//GET USER ORDERS
const getOrder = async (req, res, next) => {

    try{
        const orders = await Order.findOne({userId: req.params.id})

        res.status(200).json({
                success: true,
                message: "Retrieved orders",
                data: orders
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get orders',
            data: error
        })
    }
}

//GET ALL ORDERS
const getAllOrder = async (req, res, next) => {

    try{
        const orders = await Order.find()
        res.status(200).json({
                success: true,
                message: "Retrieved all orders",
                data: orders 
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get orders',
            data: error
        })
    }
}

//GET MONTHLY INCOME
const getIncome = async (req, res, next) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try{

        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}, ...(productId && {
                products:{$elemMatch: {productId}}
            })}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ]);

        res.status(200).json(income)
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get income',
            data: error
        })
    }
}

//DELETE ORDER
const deleteOrder = async (req, res, next) => {

    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Order has been deleted....'
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to delete order',
            data: error
        })
    }
}

module.exports = {
    createOrder,
    updateOrder,
    getOrder,
    getAllOrder,
    getIncome,
    deleteOrder
}