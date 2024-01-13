const Cart = require('../models/Cart')


//CREATE
const createCart = async (req, res, next) => {

    try {

        const newCart = await Cart.create(req.body)
        newCart.save()

        res.status(201).json({
            success: true,
            message: 'Cart Created',
            data: newCart
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Unable to create Cart"
        });
    }
}

// UPDATE CART
const updateCart = async (req, res, next) => {

    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json({
            success: true,
            message: 'Successfully updated cart',
            data: updatedCart
        })

    } catch(error){
        res.status(403).json({
            success: false,
            message: 'Unable to update cart, something went wrong',
            data: error
        })
    }
}

//GET USER PRODUCTS
const getCart = async (req, res, next) => {

    try{
        const cart = await Cart.findOne({userId: req.params.id})

        res.status(200).json({
                success: true,
                message: "Retrieved Cart",
                data: cart
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get Cart',
            data: error
        })
    }
}

//GET ALL CARTS
const getAllCart = async (req, res, next) => {

    try{
        const carts = await Cart.find()
        res.status(200).json({
                success: true,
                message: "Retrieved all carts",
                data: carts 
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get carts',
            data: error
        })
    }
}

//DELETE CART
const deleteCart = async (req, res, next) => {

    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Cart has been deleted....'
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to delete cart',
            data: error
        })
    }
}

module.exports = {
    createCart,
    updateCart,
    getCart,
    getAllCart,
    deleteCart
}