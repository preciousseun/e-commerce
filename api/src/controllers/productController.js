const Product = require('../models/Product')


//CREATE
const createProduct = async (req, res, next) => {

    try {

        const newProduct = await Product.create(req.body)
        newProduct.save()

        res.status(201).json({
            success: true,
            message: 'Product Created',
            data: newProduct
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Unable to create product"
        });
    }
}

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {

    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json({
            success: true,
            message: 'Successfully updated product',
            data: updatedProduct
        })

    } catch(error){
        res.status(403).json({
            success: false,
            message: 'Unable to update product, something went wrong',
            data: error
        })
    }
}

//GET PRODUCTS
const getProduct = async (req, res, next) => {

    try{
        const product = await Product.findById(req.params.id)

        res.status(200).json({
                success: true,
                message: "Retrieved Product",
                data: product
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get product',
            data: error
        })
    }
}

//GET ALL PRODUCTS
const getAllProduct = async (req, res, next) => {

    const qNew = req.query.new
    const qCategory = req.query.category
    try{
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        } else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                },
            });
        } else{
            products = await Product.find()
        }

        res.status(200).json({
                success: true,
                message: "Retrieved all products",
                data: products 
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to get products',
            data: error
        })
    }
}

//DELETE PRODUCT
const deleteProduct = async (req, res, next) => {

    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: 'Product has been deleted....'
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Unable to delete product',
            data: error
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getAllProduct,
    deleteProduct
}